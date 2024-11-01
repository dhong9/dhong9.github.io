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

  const subdivPointsLine = [];
  for (let i = 0; i < polyPoints.length - 1; i++) {
    subdivPointsLine.push(getSubdivPointsLine(polyPoints[i], polyPoints[i + 1], subdivisions));
  }
  subdivPointsLine.push(getSubdivPointsLine(polyPoints.at(-1), polyPoints[0], subdivisions));

  return { polyPoints, subdivPointsLine };
};
