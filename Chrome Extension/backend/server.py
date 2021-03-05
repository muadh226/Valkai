from flask import Flask, jsonify, request
import sys
import redis
import datetime
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

r = redis.StrictRedis(decode_responses=True)

def charge_amount(session_length):
    return round(0.4167*(session_length**2)+58.3333*session_length)

def update_balance(date, user_id):
    day_before = (datetime.datetime.strptime(date, "%Y-%m-%d") - datetime.timedelta(1)).strftime("%Y-%m-%d")
    day_before_id = str(user_id) + " " + day_before
    if r.exists(day_before_id):
        before_total_balance = float(r.hget(user_id, "total_balance"))
        day_before_earned = float(r.hget(day_before_id, "daily_balance"))
        r.hset(str(user_id), "total_balance", day_before_earned+before_total_balance)
    elif date == r.hget(user_id, "date_joined"):
        pass
    else:
        update_balance(day_before, user_id)

@app.route('/new_user/', strict_slashes=False, methods=['GET'])
def new_user():
    print("message received", file=sys.stderr)
    user_id = request.args["user_id"]
    if not r.exists(user_id):
        date_joined = datetime.datetime.now(datetime.timezone.utc).strftime("%Y-%m-%d")
        r.hmset(str(user_id), {"total_balance": 0, "id": user_id, "date_joined":date_joined, "badges":""})
    daily_user_id = request.args["user_id"]+" "+datetime.datetime.now(datetime.timezone.utc).strftime("%Y-%m-%d")
    if not r.exists(daily_user_id):
        update_balance(datetime.datetime.now(datetime.timezone.utc).strftime("%Y-%m-%d"),user_id)
        r.hmset(str(daily_user_id), {"id":user_id, "is_done_for_day":0, "in_session":0, "remaining_time": "NA", "end_time":"NA", "daily_balance": 24000, "time_saved":0, "total_balance":r.hget(request.args["user_id"], "total_balance")})
    return jsonify(r.hgetall(user_id))

@app.route('/info/', strict_slashes=False, methods=['GET'])
def info():
    print("message received", file=sys.stderr)
    user_id = request.args["user_id"]+" "+datetime.datetime.now(datetime.timezone.utc).strftime("%Y-%m-%d")
    if not r.exists(user_id):
        r.hmset(str(user_id), {"id":request.args["user_id"], "is_done_for_day":0, "in_session":0, "remaining_time": "NA", "end_time":"NA", "daily_balance": 24000, "time_saved":0, "total_balance":r.hget(request.args["user_id"], "total_balance")})
    end_time = r.hget(user_id, "end_time")
    if not end_time == "NA":
        remaining_time = (datetime.datetime.fromisoformat(end_time) - datetime.datetime.now()).total_seconds()
        if remaining_time <= 0:
            r.hmset(str(user_id), {"in_session":0, "remaining_time": "NA", "end_time":"NA"})
        else:
            r.hset(str(user_id), "remaining_time", remaining_time)
    return jsonify(r.hgetall(user_id))

@app.route('/update/', strict_slashes=False, methods=['GET'])
def update():
    print("message received", file=sys.stderr)
    user_id = request.args["user_id"]+" "+datetime.datetime.now(datetime.timezone.utc).strftime("%Y-%m-%d")
    session_length =float(request.args["session_length"])
    start_time_object = datetime.datetime.now()
    end_time = start_time_object+datetime.timedelta(minutes = session_length)
    remaining_time = (end_time - start_time_object).total_seconds()
    daily_balance =float(r.hget(user_id, "daily_balance"))-charge_amount(session_length)
    r.hmset(str(user_id),{ "end_time": end_time.isoformat(), "in_session":1, "remaining_time":remaining_time, "daily_balance":daily_balance, "time_saved": float(r.hget(user_id, "time_saved"))+session_length})
    if daily_balance <= 0:
        r.hmset(str(user_id), {"daily_balance":0,"is_done_for_day":1})
    return jsonify(r.hgetall(user_id))

@app.route('/done/', strict_slashes=False, methods=['GET'])
def done():
    print("message received", file=sys.stderr)
    user_id = request.args["user_id"]+" "+datetime.datetime.now(datetime.timezone.utc).strftime("%Y-%m-%d")
    r.hmset(str(user_id), {"is_done_for_day": 1, "daily_balance":0})
    return jsonify(r.hgetall(user_id))

@app.route('/session_end/', strict_slashes=False, methods=['GET'])
def session_end():
    print("message received", file=sys.stderr)
    user_id = request.args["user_id"]+" "+datetime.datetime.now(datetime.timezone.utc).strftime("%Y-%m-%d")
    end_time = r.hget(user_id, "end_time")
    remaining_time = (datetime.datetime.fromisoformat(end_time) - datetime.datetime.now()).total_seconds()
    daily_balance =float(r.hget(user_id, "daily_balance"))
    refunded_amount = charge_amount(round(remaining_time/60))*0.75
    new_daily_balance = daily_balance+refunded_amount
    r.hmset(str(user_id), {"is_done_for_day":0, "in_session":0, "remaining_time": "NA", "end_time":"NA", "daily_balance": new_daily_balance, "time_saved": float(r.hget(user_id, "time_saved"))-(remaining_time//60)})
    return jsonify(r.hgetall(user_id))

@app.route('/test/', strict_slashes=False, methods=['GET'])
def test():
    return "success"

# @app.route('/dashboard/', strict_slashes=False, methods=['GET'])
# def dashboard():
#     print("message received", file=sys.stderr)
#     user_id = request.args["user_id"]
#     return jsonify(r.hgetall(user_id))


app.run(port=8000, debug=True)
