// @flow
import type { Node, Cache } from '../types';

export const buildCache = (cache: Cache, nodes: Array<Node>): Cache => {
  for (let i = 0; i < nodes.length; i += 1) {
    const node: Node = nodes[i];
    cache[node.id] = node;
    const { children } = node;
    if (children && children.constructor === Array && children.length > 0) {
      buildCache(cache, children);
    }
  }
  return cache;
};

export const hasChildren = (node: Node): boolean => node.numChildren > 0;

export const isFullyFetched = (node: Node, numChildren: number): boolean =>
  numChildren === node.numChildren;

export const shouldShowMore = (node: Node, numChildren: number): boolean =>
  numChildren < node.numChildren;
