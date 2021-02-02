import json
import os

from flask import Flask, request, Response
from slack import WebClient
from core.service import req_svc

app = Flask(__name__, template_folder='')

client = WebClient(token=os.environ.get('TOKEN'))


@app.route('/interactive', methods=['POST'])
def interactive():
    payload = json.loads(request.form["payload"])
    title = payload["view"]["state"]["values"]["block_title"]["action_title"]["value"]
    category = payload["view"]["state"]["values"]["block_category"]["action_category"]["value"]
    team = payload["view"]["state"]["values"]["block_team"]["action_team"]["value"]
    description = payload["view"]["state"]["values"]["block_description"]["action_description"]["value"]
    link = payload["view"]["state"]["values"]["block_link"]["action_link"]["value"]
    user = {'username': 'slack'}
    archived = False
    status = 'backlog'
    analysis = True
    priority = 2
    is_trash = False
    req_svc.create_req(user, status, title, archived, analysis, is_trash, team, priority, category,
                       link,
                       description)
    return Response()


@app.route('/slashcommand', methods=['GET', 'POST'])
def slashcommand():
    with open("modal.txt") as modalfile:
        client.views_open(trigger_id=request.form["trigger_id"], view=json.load(modalfile))
    return Response()


if __name__ == '__main__':
    app.run()