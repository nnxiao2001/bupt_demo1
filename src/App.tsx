import { Flex, Layout, Menu } from 'antd';
import { Col, Row } from 'antd';
import { Table, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { MenuProps } from 'antd';
import React from 'react';
import RouterGraph from './Component/RouterGraph';

const { Header, Content } = Layout;

const pictureData = [
  {
    src: '/SDN架构图.png',
  },
]

interface ResourceDataType {
  key: React.Key;
  ID: string;
  value: string;
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
    title: '节点ID',
    width: 100,
    dataIndex: 'ID',
    key: 'ID',
  },
  {
    title: '算力资源',
    width: 100,
    dataIndex: 'value',
    key: 'value',
  },
  {
    title: '任务队列',
    dataIndex: 'queue',
    key: 'queue',
    width: 200,
  },
];

const netColumns: ColumnsType<ResourceDataType> = [
  {
    title: '节点ID',
    width: 100,
    dataIndex: 'ID',
    key: 'ID',
  },
  {
    title: '网络资源',
    width: 100,
    dataIndex: 'value',
    key: 'value',
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
const netData: ResourceDataType[] = [];
const workData: WorkDataType[] = [];
for (let i = 0; i < 15; i++) {
  compData.push({
    key: i,
    ID: `Computing point ${i}`,
    value: '400',
    queue: `53475876`,
  });
}
for (let i = 0; i < 10; i++) {
  netData.push({
    key: i,
    ID: `Network point ${i}`,
    value: '500',
    queue: '65485967898',
  });
}
for (let i = 0; i < 60; i++) {
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
  let [on, setOn] = React.useState(false);

  const lightOn = () => {
    setOn(true);
  };

  const lightOff = () => {
    setOn(false);
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
              暂停调度
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
                    title={() => '计算资源表'}
                    scroll={{ y: 277 }}
                />
              </Col>
              <Col span={24}>
                <Table
              
                  columns={workColumns}
                  dataSource={workData}
                  bordered
                  title={() => '任务列表'}
                  scroll={{ y: 225}}
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
