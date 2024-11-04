/**
=========================================================
* Danyo-1.2
=========================================================

* Copyright 2024 Danyo (https://www.danyo.tech)

Coded by www.danyo.tech

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

const visualizeSubdivisionsCode = `/**
 * Project: Visualize Subdivisions
 * Author: Daniel Hong
 * Description: Visualize Polygon Subdivisions in ProcessingJS
 */

/**
 * Computes midpoints between each pair of adjacent vertices on
 * a polygon
 * @param {Array<Number>} points points on a polygon
 * @returns vertices with midpoints computed
 */
const getPolyPoints = (points) => {
  const polyPoints = [];

  // Compute midpoints of each pair of adjacent vertices
  for (let i = 0; i < points.length - 1; i++) {
    const [x1, y1] = points[i];
    const [x2, y2] = points[i + 1];
    const midX = (x2 + x1) / 2,
      midY = (y2 + y1) / 2;
    polyPoints.push(points[i]);
    polyPoints.push([midX, midY]);
  }

  // Compute midpoint between last vertex and first vertex
  const [x1, y1] = points.at(-1);
  const [x2, y2] = points[0];
  const midX = (x2 + x1) / 2,
    midY = (y2 + y1) / 2;
  polyPoints.push(points.at(-1));
  polyPoints.push([midX, midY]);

  return polyPoints;
};

const getSubdivPointsLine = ([x1, y1], [x2, y2], subdivisions) => {
  const dx = (x2 - x1) / -~subdivisions,
    dy = (y2 - y1) / -~subdivisions;

  const subdivPoints = [];

  for (let i = 0; i < subdivisions; i++) {
    subdivPoints.push([x1 - ~i * dx, y1 - ~i * dy]);
  }

  return subdivPoints;
};

/**
 * Computes intersecting point between two lines
 * @param {Array<Number>} line0 one line represented as [x1, y1, x2, y2]
 * @param {Array<Number>} line1 one line represented as [x3, y3, x4, y4]
 * @returns intersecting point [x, y]
 */
const findIntersection = ([x1, y1, x2, y2], [x3, y3, x4, y4]) => {
  const m1 = (y2 - y1) / (x2 - x1),
    m2 = (y4 - y3) / (x4 - x3);

  // If m1 is undefined, then m2 should be defined
  if (x2 === x1) {
    // y4 = m2*x4 + b
    const b = y4 - m2 * x4;
    const y = m2 * x2 + b;
    return [x2, y];
  }

  // If m2 is undefined, then m1 should be defined
  if (x3 === x4) {
    // y2 = m1*x2 + b
    const b = y2 - m1 * x2;
    const y = m1 * x4 + b;
    return [x4, y];
  }

  // General case:
  // Both lines have defined slopes
  const b1 = y2 - m1 * x2,
    b2 = y4 - m2 * x4;

  // m1*x + b1 = m2*x + b2
  // (m1 - m2)*x = b2 - b1
  const x = (b2 - b1) / (m1 - m2);
  const y = m1 * x + b1;
  return [x, y];
};
`;

export default visualizeSubdivisionsCode;
