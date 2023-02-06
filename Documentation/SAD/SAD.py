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
    database>>Rust("API")>>[frontend, Authentication("Firebase Auth")]
    database >> Extensions("Algolia Text Search")
    frontend>> Users("Users")
