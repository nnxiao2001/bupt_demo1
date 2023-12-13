import React, { Component } from 'react'
import Graph from "react-vis-network-graph"
import { Drawer, Button, Space, Descriptions, Empty, Badge, Divider } from 'antd';
import Videos from '../Videos';

const CAMERA_NUMBER = 3

let options = {
    autoResize: true,
    height: '700px',
    width: '100%',
    locale: 'en',
    locales: {
        en: {
            edit: 'Edit',
            del: 'Delete selected',
            back: 'Back',
            addNode: 'Add Node',
            addEdge: 'Add Edge',
            editNode: 'Edit Node',
            editEdge: 'Edit Edge',
            addDescription: 'Click in an empty space to place a new node.',
            edgeDescription: 'Click on a node and drag the edge to another node to connect them.',
            editEdgeDescription: 'Click on the control points and drag them to a node to connect to it.',
            createEdgeError: 'Cannot link edges to a cluster.',
            deleteClusterError: 'Clusters cannot be deleted.',
            editClusterError: 'Clusters cannot be edited.'
        }
    },
    clickToUse: false,
    groups: {
        useDefaultGroups: true,
        hosts1: {
            image: '/host1.png',
            size: 25
        },
        hosts2: {
            image: '/host2.png',
            size: 25
        },
        cameras: {
            image: '/camera.png',
            size: 20
        }
    },
    edges: {
        arrows: {
            to: {
                enabled: false, //箭头有无
                scaleFactor: 1,
                type: "arrow"
            },
        },
        chosen: false,
        color: {
            color: 'black', //默认
            highlight: '#24e41b', //选中
            hover: '#565656', //覆盖
        },
        dashes: false, //虚线

        physics: true,

        scaling: {
            min: 5,
            max: 150,
            customScalingFunction: (min, max, total, value) => value / total,
        },
        shadow: true,
        smooth: false,
    },
    nodes: {
        borderWidth: 1,
        shapeProperties: {
            useBorderWithImage: false,
        },
        color: {
            border: 'red',
            background: '#97C2FC',
            highlight: {
                border: '#24e41b',
                background: '#24e41b'
            },
            hover: {
                border: '#2B7CE9',
                background: '#D2E5FF'
            }
        },
        fixed: false,
        shape: 'image',
        mass: 1,
        size: 10,
        scaling: {
            customScalingFunction: (min, max, total, value) => value / total,
            min: 5,
            max: 150
        }
    },
    interaction: {
        hover: true,
        hoverConnectedEdges: true,
        dragNodes: true,
        dragView: false,
        zoomView: false
    },
    layout: {
        randomSeed: 1,
        improvedLayout: true,
        hierarchical: {
            enabled: true,
            levelSeparation: 180,
            nodeSpacing: 290,
            blockShifting: true,
            edgeMinimization: true,
            parentCentralization: true,
            direction: 'UD',        // UD, DU, LR, RL
            sortMethod: 'hubsize',  // hubsize, directed
            shakeTowards: 'leaves'  // roots, leaves
        }
    },
    physics: false,

}

let routers = {
    "nodes": [
        {
            "id": 10450,
            "label": "192.2.1.2",
            "group": 'hosts1',
            shapeProperties: {
                useBorderWithImage: false
            },
            color: {
            }
        },
        {
            "id": 10451,
            "label": "192.2.2.4",
            "group": 'hosts1',
            shapeProperties: {
                useBorderWithImage: false
            },
            color: {
            }
        },
        {
            "id": 10452,
            "label": "192.2.3.2",
            "group": 'hosts1',
            shapeProperties: {
                useBorderWithImage: false
            },
            color: {
            }
        },
        {
            "id": 1000001,
            "label": "192.2.1.3",
            "group": 'hosts2',
            shapeProperties: {
                useBorderWithImage: false
            },
            color: {
            }
        },
        {
            "id": 1000002,
            "label": "192.2.2.3",
            "group": 'hosts2',
            shapeProperties: {
                useBorderWithImage: false
            },
            color: {
            }
        },
        {
            "id": 1000003,
            "label": "192.2.1.4",
            "group": 'hosts2',
            shapeProperties: {
                useBorderWithImage: false
            },
            color: {
            }
        },
        {
            "id": 1000004,
            "label": "192.2.1.5",
            "group": 'hosts2',
            shapeProperties: {
                useBorderWithImage: false
            },
            color: {
            }
        },
        {
            "id": 1000006,
            "label": "192.2.3.3",
            "group": 'hosts2',
            shapeProperties: {
                useBorderWithImage: false
            },
            color: {
            }
        },
        {
            "id": 2000000,
            "label": "192.168.101.11",
            "group": 'cameras'
        },
        {
            "id": 2000001,
            "label": "192.168.101.12",
            "group": 'cameras'
        },
        {
            "id": 2000002,
            "label": "192.168.103.11",
            "group": 'cameras'
        }
    ],
    "edges": [
        {
            "from": 10450,
            "to": 1000004
        },
        {
            "from": 10450,
            "to": 1000001
        },
        {
            "from": 10450,
            "to": 1000002
        },
        {
            "from": 10450,
            "to": 1000003
        },
        {
            "from": 10451,
            "to": 1000002
        },
        // {
        //     "from": 10451,
        //     "to": 1000005
        // },
        {
            "from": 10452,
            "to": 1000002
        },
        {
            "from": 10452,
            "to": 1000006
        },
        {
            "from": 10450,
            "to": 1000004
        },
        {
            "from": 10450,
            "to": 1000001
        },
        {
            "from": 10450,
            "to": 1000002
        },
        {
            "from": 10450,
            "to": 1000003
        },
        {
            "from": 2000000,
            "to": 1000001
        },
        {
            "from": 2000001,
            "to": 1000003
        },
        {
            "from": 2000002,
            "to": 1000006
        },
    ]
}
// routers.nodes.forEach((item) => {
//     item.group = 'cameras'
// });

const clientWidth = document.body.clientWidth;
const clientHeight = document.body.clientHeight;
const style = {
    RowLayout: {
        display: 'flex',
        flexDirection: 'row',
        width: `${clientWidth - 200}px`,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        background: "#f0ffff",
    },
    ShowLayout: {
        marginTop: 24,
        marginBottom: 24,
        marginLeft: "3%",
        width: "60%",
        minHeight: `${clientHeight - 200}px`,
        background: "#e6fffb",
    },
    SettingLayout: {
        marginTop: 24,
        width: "20%",
        marginRight: "10%",
        minHeight: `${clientHeight - 200}px`,
    },
}

const videos = ['/打螺丝1.mp4', '/打螺丝2越界.mp4', '打螺丝2正常.mp4']
const results = ['/打螺丝1.mp4', '/打螺丝2越界.mp4', '打螺丝2正常.mp4']

export default class index extends Component {
    //react自己的数据结构，定义动态变量
    state = {
        nodes: [],
        edges: [],
        detailNodes: [],
        detailEdges: [],
        subnetNodes: [],
        subnetEdges: [],
        hostDetail: {
            id: '',
            ip: '',
            type: '',
            time: '',
            department: '',
            manager: ''
        },
        hostDisplay: '',
        subnetDisplay: 'none',
        generalDisplay: '',
        subnetGeneralDisplay: 'none',
        mode: 1,
        subNetNum: 0,
        routerNum: 0,
        subnetRouterNumber: 0,
        switchNum: 0,
        modalVisible: false,
        videoUrl: '',
        // schedule: true,
    };

    shouldComponentUpdate() {

        let newNodes = [
            {
                "id": 10450,
                "label": "192.2.1.2",
                "group": 'hosts1',
                shapeProperties: {
                    useBorderWithImage: false
                },
                color: {
                }
            },
            {
                "id": 10451,
                "label": "192.2.2.4",
                "group": 'hosts1',
                shapeProperties: {
                    useBorderWithImage: false
                },
                color: {
                }
            },
            {
                "id": 10452,
                "label": "192.2.3.2",
                "group": 'hosts1',
                shapeProperties: {
                    useBorderWithImage: false
                },
                color: {
                }
            },
            {
                "id": 1000001,
                "label": "192.2.1.3",
                "group": 'hosts2',
                shapeProperties: {
                    useBorderWithImage: false
                },
                color: {
                }
            },
            {
                "id": 1000002,
                "label": "192.2.2.3",
                "group": 'hosts2',
                shapeProperties: {
                    useBorderWithImage: false
                },
                color: {
                }
            },
            {
                "id": 1000003,
                "label": "192.2.1.4",
                "group": 'hosts2',
                shapeProperties: {
                    useBorderWithImage: false
                },
                color: {
                }
            },
            {
                "id": 1000004,
                "label": "192.2.1.5",
                "group": 'hosts2',
                shapeProperties: {
                    useBorderWithImage: false
                },
                color: {
                }
            },
            {
                "id": 1000006,
                "label": "192.2.3.3",
                "group": 'hosts2',
                shapeProperties: {
                    useBorderWithImage: false
                },
                color: {
                }
            },
            {
                "id": 2000000,
                "label": "192.168.101.11",
                "group": 'cameras'
            },
            {
                "id": 2000001,
                "label": "192.168.101.12",
                "group": 'cameras'
            },
            {
                "id": 2000002,
                "label": "192.168.103.11",
                "group": 'cameras'
            }
        ]
        routers.nodes = newNodes
        return true
    }



    //点击路由器时识别节点
    getNode = (id) => {
        for (var i = 0; i < routers.nodes.length; i++) {
            if (id === routers.nodes[i].id) {
                return routers.nodes[i];
            }
        }
    }

    handleOpenModal = (url) => {
        this.setState({
            videoUrl: url,
            modalVisible: true
        })
    };
    handleCloseModal = () => {
        this.setState({
            modalVisible: false
        })
    };


    //页面视图渲染函数
    render() {

        if (this.props.schedule) {
            //routers.nodes[0].group = 'cameras'
            //开始调度
            let nodeNumber = routers.nodes.length - CAMERA_NUMBER
            let originalArray = []
            for (let i = 0; i < nodeNumber; i++) {
                originalArray.push(i)
            }
            for (let i = originalArray.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [originalArray[i], originalArray[j]] = [originalArray[j], originalArray[i]];
            }
            for (let i = 0; i < CAMERA_NUMBER; i++) {
                let id = originalArray[i]
                routers.nodes[id].shapeProperties.useBorderWithImage = true
                routers.nodes[id].resultUrl = results[i]
            }
        }

        let graph;
        graph = {
            nodes: routers.nodes,
            edges: routers.edges
        }
        const events = {
            doubleClick: (event) => {
                console.log(event)

                if (event.nodes.length > 0) {
                    var id = event.nodes[0]
                    //var detail = this.getNode(id)
                    if (id >= 2000000) {
                        this.handleOpenModal(videos[id % 3])
                    }else{
                        let node = this.getNode(id)
                        if('resultUrl' in node){
                            this.handleOpenModal(node.resultUrl)
                        }
                    }
                    
                }

                else {
                    this.setState({
                        hostDisplay: 'none',
                        subnetDisplay: 'none',
                    })
                }
            },
        }


        return (
            <div>
                <Graph
                    graph={graph}
                    options={options}
                    events={events}
                />

                <Videos
                    videoUrl={this.state.videoUrl}  // 替换为实际视频链接
                    visible={this.state.modalVisible}
                    onClose={this.handleCloseModal}
                />
            </div>
        )
    }
}
