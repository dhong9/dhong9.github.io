/**
=========================================================
* Danyo-1.2
=========================================================

* Copyright 2024 Danyo (https://www.danyo.tech)

Coded by www.danyo.tech

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

export const getPolyPoints = (points) => {
  const polyPoints = [];

  for (let i = 0; i < points.length; i++) {
    const [x1, y1] = points[i];
    const [x2, y2] = points[i + 1];
    const midX = (x2 + x1) / 2,
      midY = (y2 + y1) / 2;
    polyPoints.push(points[i]);
    polyPoints.push([midX, midY]);
  }

  return polyPoints;
};
