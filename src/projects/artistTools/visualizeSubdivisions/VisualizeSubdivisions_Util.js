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

export const buildStringArtObject = (points, subdivisions) => {
  const polyPoints = getPolyPoints(points);

  // Move first point to the end
  polyPoints.push(polyPoints.shift());

  const subdivPointsLine = [];
  const netLines = [];
  for (let i = 0; i < polyPoints.length - 2; i += 2) {
    const polyPoint1 = polyPoints[i],
      polyPoint2 = polyPoints[i + 1],
      polyPoint3 = polyPoints[i + 2];

    const subdivPoints1 = getSubdivPointsLine(polyPoint1, polyPoint2, subdivisions),
      subdivPoints2 = getSubdivPointsLine(polyPoint2, polyPoint3, subdivisions);
    subdivPointsLine.push(subdivPoints1, subdivPoints2);

    netLines.push([polyPoint1[0], polyPoint1[1], subdivPoints2[0][0], subdivPoints2[0][1]]);

    // Weave intermediate lines
    for (let j = 0; j < subdivisions; j++) {
      netLines.push([
        subdivPoints1[j][0],
        subdivPoints1[j][1],
        subdivPoints2[-~j][0],
        subdivPoints2[-~j][1],
      ]);
    }

    netLines.push([polyPoint3[0], polyPoint3[1], subdivPoints1.at(-1)[0], subdivPoints1.at(-1)[1]]);
  }

  return { polyPoints, subdivPointsLine, netLines };
};
