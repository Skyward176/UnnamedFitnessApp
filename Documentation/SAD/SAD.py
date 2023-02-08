# System Architecture Diagram

from diagrams import Diagram
from diagrams.firebase.develop import Authentication, Firestore
from diagrams.firebase.extentions import Extensions
from diagrams.programming.language import Rust
from diagrams.programming.framework import Vue
from diagrams.onprem.client import Users
graph_attr = {
    "fontsize": "25",
    "nodesep": "1",

}
with Diagram("upLift", direction="LR", filename="systemArchitectureDiagram", graph_attr=graph_attr):
    database = Firestore("Database")
    frontend = Vue("Frontend")
    search = Extensions("Algolia Text Search")
    database - Rust("API")-[frontend, Authentication("Firebase Auth")]
    database >> search
    search >> frontend
    frontend - Users("Users")
