/**
=========================================================
* Danyo-1.2
=========================================================

* Copyright 2024 Danyo (https://www.danyo.tech)

Coded by www.danyo.tech

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

const getPolyPoints = (points) => {
  const polyPoints = [];

  for (let i = 0; i < points.length - 1; i++) {
    const [x1, y1] = points[i];
    const [x2, y2] = points[i + 1];
    const midX = (x2 + x1) / 2,
      midY = (y2 + y1) / 2;
    polyPoints.push(points[i]);
    polyPoints.push([midX, midY]);
  }

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

const findIntersection = ([x1, y1, x2, y2], [x3, y3, x4, y4]) => {
  // General case:
  // Both lines have defined slopes
  const m1 = (y2 - y1) / (x2 - x1),
    m2 = (y4 - y3) / (x4 - x3);
  const b1 = y2 - m1 * x2,
    b2 = y4 - m2 * x4;

  // m1*x + b1 = m2*x + b2
  // (m1 - m2)*x = b2 - b1
  const x = (b2 - b1) / (m1 - m2);
  const y = m1 * x + b1;
  return [x, y];
};

export const buildStringArtObject = (points, subdivisions) => {
  const polyPoints = getPolyPoints(points);

  // Move first point to the end
  polyPoints.push(polyPoints.shift());

  const subdivPointsLine = [];
  const netLines = [];
  const intersectionPoints = [];
  for (let i = 0; i < polyPoints.length - 2; i += 2) {
    const polyPoint1 = polyPoints[i],
      polyPoint2 = polyPoints[i + 1],
      polyPoint3 = polyPoints[i + 2];

    const subdivPoints1 = getSubdivPointsLine(polyPoint1, polyPoint2, subdivisions),
      subdivPoints2 = getSubdivPointsLine(polyPoint2, polyPoint3, subdivisions);
    subdivPointsLine.push(subdivPoints1, subdivPoints2);

    const tempNetLines = [];

    tempNetLines.push([polyPoint1[0], polyPoint1[1], subdivPoints2[0][0], subdivPoints2[0][1]]);

    // Weave intermediate lines
    for (let j = 0; j < subdivisions - 1; j++) {
      tempNetLines.push([
        subdivPoints1[j][0],
        subdivPoints1[j][1],
        subdivPoints2[-~j][0],
        subdivPoints2[-~j][1],
      ]);
    }

    tempNetLines.push([
      polyPoint3[0],
      polyPoint3[1],
      subdivPoints1.at(-1)[0],
      subdivPoints1.at(-1)[1],
    ]);

    // Find intersection of each pair of net lines
    for (let j = 0; j < tempNetLines.length - 1; j++) {
      intersectionPoints.push(findIntersection(tempNetLines[j], tempNetLines[j + 1]));
    }

    netLines.push(...tempNetLines);
  }

  // Last 3 points
  const polyPoint1 = polyPoints.at(-2),
    polyPoint2 = polyPoints.at(-1),
    polyPoint3 = polyPoints[0];
  const subdivPoints1 = getSubdivPointsLine(polyPoint1, polyPoint2, subdivisions),
    subdivPoints2 = getSubdivPointsLine(polyPoint2, polyPoint3, subdivisions);
  subdivPointsLine.push(subdivPoints1, subdivPoints2);

  netLines.push([polyPoint1[0], polyPoint1[1], subdivPoints2[0][0], subdivPoints2[0][1]]);

  // Weave intermediate lines
  for (let j = 0; j < subdivisions - 1; j++) {
    netLines.push([
      subdivPoints1[j][0],
      subdivPoints1[j][1],
      subdivPoints2[-~j][0],
      subdivPoints2[-~j][1],
    ]);
  }

  netLines.push([polyPoint3[0], polyPoint3[1], subdivPoints1.at(-1)[0], subdivPoints1.at(-1)[1]]);

  return { polyPoints, subdivPointsLine, netLines, intersectionPoints };
};
