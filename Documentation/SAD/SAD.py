# System Architecture Diagram

from diagrams import Diagram
from diagrams.firebase.develop import Authentication, Firestore
from diagrams.firebase.extentions import Extensions
from diagrams.programming.framework import Vue
from diagrams.onprem.client import Users
graph_attr = {
    "fontsize": "25",
    "nodesep": "1",

}
with Diagram("upLift", direction="LR", filename="systemArchitectureDiagram", graph_attr=graph_attr):
    database = Firestore("Firestore Database")
    frontend = Vue("Frontend")
    search = Extensions("Algolia Text Search")
    database - frontend
    database >> search
    search - frontend
    frontend - Authentication("Firebase Auth")
    frontend - Users("Users")
