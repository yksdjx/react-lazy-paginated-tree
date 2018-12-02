import React from 'react';
import ReactDOM from 'react-dom';
import { Tree, SampleTree, minimalTheme } from 'react-lazy-paginated-tree';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const loadChildren = async (node: Node, pageLimit: number = 5) => {
  await sleep(500);
  const children = [];
  for (let i = 0; i < pageLimit; i += 1) {
    children.push({
      id: i * node.page,
      name: `${node.name}${i * node.page}`,
      description: '',
      children: [],
      numChildren: pageLimit,
      page: 0,
      expanded: false,
      selected: false,
    });
  }
  return children;
};

const loadChildrenPaginated = async (node: Node, pageLimit: number = 5) => {
  await sleep(500);
  const children = [];
  for (let i = 0; i < pageLimit; i += 1) {
    children.push({
      id: i * node.page,
      name: `${node.name}${i + (node.page - 1) * pageLimit}`,
      description: '',
      children: [],
      numChildren: pageLimit * 3,
      page: 0,
      expanded: false,
      selected: false,
    });
  }
  return children;
};

const lazySample = [
  {
    id: 1,
    name: '2017',
    description: 'Last Year',
    children: [],
    page: 0,
    numChildren: 5,
    expanded: false,
    selected: false,
  },
  {
    id: 5,
    name: '2018',
    description: 'Current Year',
    children: [],
    page: 0,
    numChildren: 5,
    expanded: false,
    selected: false,
  },
]

const App = () => (
  <div className="app">
    <h1>React-Lazy-Paginated-Tree Demo</h1>
    <h2>Default Material UI Theme</h2>
    <Tree nodes={JSON.parse(JSON.stringify(SampleTree))} useLocalState />
    <h2>Minimal Theme</h2>
    <Tree
      nodes={JSON.parse(JSON.stringify(SampleTree))}
      theme={minimalTheme}
      useLocalState
    />
    <h2>Lazy Loaded Nodes</h2>
    <Tree nodes={lazySample} loadChildren={loadChildren} useLocalState />
    <h2>Lazy Loaded Nodes and Pagination</h2>
    <Tree
      nodes={JSON.parse(JSON.stringify(lazySample))}
      loadChildren={loadChildrenPaginated}
      pageLimit={3}
      paginated
      useLocalState
    />
    <h2>Minimal Theme, Lazy Loaded Nodes and Pagination</h2>
    <Tree
      nodes={JSON.parse(JSON.stringify(lazySample))}
      loadChildren={loadChildrenPaginated}
      pageLimit={3}
      theme={minimalTheme}
      paginated
      useLocalState
    />
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));
