import networkx as nx
import matplotlib.pyplot as plt
import openpyxl
import numpy as np
import operator
import json
from networkx.readwrite import json_graph
import flask

#Nodos
G=nx.DiGraph()

#Nodos nivel 0
nodoyo=["MARIA INES"]

#Nodos nivel 1 y 2
nodosedu=["EDUCACION",
          "UNIVERSIDAD","CURSOS MOOC","SOFTWARE","IDIOMAS",
          "LIC.COMERCIO EXTERIOR","MA. EN ECONOMIA",
          "PYTHON","ENGLISH","CHINA","GESTION DE PROYECTOS","MACRO LATAM",
          "PYTHON","TABLEAU","STATA","E-VIEWS","MATLAB",
          "INGLES","ALEMAN"]
nodosexp=["EXPERIENCIA",
          "PAREXEL","DAYTRADE THE WORLD","CISCO","MIN.DE HACIENDA","MIN. MODERNIZACION"]
nodosint=["INTERESES",
          "FUTBOL 5","J.CORTAZAR","BIG DATA","BLOCKCHAIN","RIVER","ECONOMIA"]

#Todos los nodos
nodostot=[nodoyo,nodosedu,nodosexp,nodosint]

i=0
while i<4:
    for item in nodostot[i]:
        G.add_node(item ,group=i)
    i +=1

#Edges conectados a "MARIA INES"
G.add_edge("MARIA INES","EDUCACION")
G.add_edge("MARIA INES","EXPERIENCIA")
G.add_edge("MARIA INES","INTERESES")

#Edges educación
i=0
a=1
while a<5:
    for item in nodosedu:
        G.add_edge(nodosedu[i],nodosedu[a])
    a +=1

i=1
a=5
while a<7:
    for item in nodosedu:
        G.add_edge(nodosedu[i],nodosedu[a])
    a +=1

i=2
a=7
while a<12:
    for item in nodosedu:
        G.add_edge(nodosedu[i],nodosedu[a])
    a +=1


i=3
a=12
while a<17:
    for item in nodosedu:
        G.add_edge(nodosedu[i],nodosedu[a])
    a+=1


i=4
a=17
while a<19:
    for item in nodosedu:
        G.add_edge(nodosedu[i],nodosedu[a])
    a+=1

        
#Edges experiencia:
i=0
a=1
while a<6:
    for item in nodosexp:
        G.add_edge(nodosexp[i],nodosexp[a])
    a +=1

#Edges intereses:
i=0
a=1
while a<7:
    for item in nodosint:
        G.add_edge(nodosint[i],nodosint[a])
    a +=1

print("TOTAL EDGES",G.edges())

fixed_position={
                "MARIA INES":(6,6),
                "EDUCACION":(4,6),
                "EXPERIENCIA":(8,6),
                "INTERESES":(6,4),
                "IDIOMAS":(4,7),
                "UNIVERSIDAD":(2,7),
                "CURSOS MOOC":(2,6),
                "SOFTWARE":(3,5)
                }
fixed_node=fixed_position.keys()
pos=nx.fruchterman_reingold_layout(G,pos=fixed_position,fixed=fixed_node)

nx.draw_networkx(G,pos=pos)
nx.draw_networkx_nodes(G,
                       pos=pos,
                       nodelist=["MARIA INES"],
                       node_size=400,
                       node_color="b"
                       )
plt.show()

d=json_graph.node_link_data(G)

json.dump(d,(open("cv.json","w")))
print(d)
print("wrote node-link json data to cv.json")

