import { Flex, Layout, Menu } from 'antd';
import { Col, Row } from 'antd';
import { Table, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { MenuProps } from 'antd';
import React from 'react';
import RouterGraph from './Component/RouterGraph';
import internal from 'stream';
import { randomBytes } from 'crypto';

const { Header, Content } = Layout;

const pictureData = [
  {
    src: process.env.PUBLIC_URL+ '/SDN架构图.png',
  },
]

interface ResourceDataType {
  key: React.Key;
  ID: string;
  value_n: number;
  value_s: number;
  cpu:number;
  gpu:number;
  value_o:number;
  queue: string;
}

interface WorkDataType {
  key: React.Key;
  ID: string;
  bornID: string;
  type:string;
  size: string;
  delay: string;
  prio:string;
  state: string;
}


const compColumns: ColumnsType<ResourceDataType> = [
  {
    title: 'IPv4',
    width: 100,
    dataIndex: 'ID',
    key: 'ID',
  },
  {
    title: '网络能力',
    width: 100,
    dataIndex: 'value_n',
    key: 'value_n',
  },
  {
    title: '存储能力',
    width: 100,
    dataIndex: 'value_s',
    key: 'value_s',
  },
  {
    title: 'CPU',
    width: 100,
    dataIndex: 'cpu',
    key: 'cpu',
  },
  {
    title: 'GPU',
    width: 100,
    dataIndex: 'gpu',
    key: 'gpu',
  },
  {
    title: '综合能力',
    width: 100,
    dataIndex: 'value_o',
    key: 'value_o',
  },
  {
    title: '任务队列',
    dataIndex: 'queue',
    key: 'queue',
    width: 200,
  },
];

const workColumns: ColumnsType<WorkDataType> = [
  {
    title: '任务队列ID',
    width: 100,
    dataIndex: 'ID',
    key: 'ID',
  },
  {
    title: '发起端',
    width: 100,
    dataIndex: 'bornID',
    key: 'bornID',
  },
  {
    title: '任务类型',
    dataIndex: 'type',
    key: 'types',
    width: 100,
  },
  {
    title: '数据量',
    dataIndex: 'size',
    key: 'size',
    width: 100,
  },
  {
    title: '容忍时延',
    dataIndex: 'delay',
    key: 'delay',
    width: 100,
  },
  {
    title: '任务优先级',
    dataIndex: 'prio',
    key: 'prio',
    width: 100,
  },
  {
    title: '状态',
    dataIndex: 'state',
    key: 'state',
    width: 100,
  },
];


const compData: ResourceDataType[] = [];
// const netData: ResourceDataType[] = [];
const workData: WorkDataType[] = [];
  compData.push({
    key: 0,
    ID: `192.2.1.2`,
    value_n:1.32,
    value_s:5.75,
    cpu:2.79,
    gpu:1.80,
    value_o:11.66,
    queue: ' ',
  },
  {
    key: 1,
    ID: `192.2.1.3`,
    value_n:0.88,
    value_s:0.19,
    cpu:1.16,
    gpu:0.00,
    value_o:2.23,
    queue: ' ',
  },
  {
    key: 2,
    ID: `192.2.1.4`,
    value_n:1.15,
    value_s:0.15,
    cpu:1.13,
    gpu:0.00,
    value_o:2.43,
    queue: ' ',
  },
  {
    key: 3,
    ID: `192.2.1.5`,
    value_n:1.92,
    value_s:4.04,
    cpu:1.87,
    gpu:3.99,
    value_o:11.82,
    queue: ' ',
  },
  {
    key: 4,
    ID: `192.2.2.3`,
    value_n:1.01,
    value_s:4.44,
    cpu:1.74,
    gpu:2.24,
    value_o:9.43,
    queue: ' ',
  },
  {
    key: 5,
    ID: `192.2.2.4`,
    value_n:1.52,
    value_s:2.05,
    cpu:3.40,
    gpu:3.07,
    value_o:10.04,
    queue: ' ',
  },
  {
    key: 6,
    ID: `192.2.3.2`,
    value_n:1.13,
    value_s:4.16,
    cpu:3.22,
    gpu:2.40,
    value_o:10.91,
    queue: ' ',
  },
  {
    key: 7,
    ID: `192.2.3.3`,
    value_n:1.31,
    value_s:0.79,
    cpu:1.43,
    gpu:0.49,
    value_o:4.02,
    queue: ' ',
  });

for (let i = 0; i < 3; i++) {
  workData.push({
    key: i,
    ID: `1-234321-2`, //temporary
    bornID: `节点-${i%6}`,//temporary
    type:'2',
    size: '700',
    delay: '90',
    prio: '1',
    state: '待处理',
  });
}


const items1: MenuProps['items'] = ['协同调度'].map(
  (value, index) => ({
    key: String(index + 1),
    label: value,
  })
);

const App: React.FC = () => {
  const [on, setOn] = React.useState(false);
  const [taskListData, setTaskListData] = React.useState<WorkDataType[]>(workData);

  const lightOn = () => {
    setOn(true);
    // Update the state to change the text in the last column for the first three rows
    setTaskListData((prevData) =>
      prevData.map((item, index) => {
        if (index < 3) {
          return { ...item, state: '处理中' };
        }
        return item;
      })
    );
  };

  const lightOff = () => {
    setOn(false);
    // Restore the text in the last column for the first three rows to '待处理'
    setTaskListData((prevData) =>
      prevData.map((item, index) => {
        if (index < 3) {
          return { ...item, state: '待处理' };
        }
        return item;
      })
    );
  };

  const pictureColumns = [
    {
      dataIndex: 'src',
      key: 'src',
      render: (text: any) => (
        <Flex justify={'center'} align={'center'}>
          <RouterGraph schedule={on} />
        </Flex>
      ),
    },
  ];

  return (
    <Layout className="layout">
      <Header>
        <Flex justify="space-between" align="center">
          <Menu theme="dark" mode="horizontal" items={items1} />
          <Flex justify="flex-end">
            <Button type="primary" onClick={lightOn}>
              开始调度
            </Button>
            <Button type="primary" onClick={lightOff}>
              结束调度
            </Button>
          </Flex>
        </Flex>
      </Header>
      <Content>
        <Row gutter={24}>
          <Col span={12}>
            <Table
              columns={pictureColumns}
              dataSource={pictureData}
              showHeader={false}
              pagination={false}
              bordered
              title={() => '拓扑图'}
            />
          </Col>
          <Col span={12}>
            <Row gutter={24}>
              <Col span={24}>
                <Table
                  columns={compColumns}
                  dataSource={compData}
                  bordered
                  size={"small"}
                  title={() => '计算资源表'}
                  scroll={{ y: 277 }}
                />
              </Col>
              <Col span={24}>
                <Table
                  columns={workColumns}
                  dataSource={taskListData}
                  bordered
                  size={"small"}
                  title={() => '任务列表'}
                  scroll={{ y: 225 }}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default App;