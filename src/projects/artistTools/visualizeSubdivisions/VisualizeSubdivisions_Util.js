/**
=========================================================
* Danyo-1.2
=========================================================

* Copyright 2024 Danyo (https://www.danyo.tech)

Coded by www.danyo.tech

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

class VisualizeSubdivisions_Util {
  constructor(points, subdivisions) {
    this.points = points;
    this.subdivisions = subdivisions;
  }

  getSubdivPoints() {
    const subdivPoints = [];
    for (let i = 0; i < this.points.length - 1; i++) {
      const [x1, y1] = this.points[i];
      const [x2, y2] = this.points[i + 1];
      const dx = (x2 - x1) / -~this.subdivisions,
        dy = (y2 - y1) / -~this.subdivisions;
      const tempPoints = [];
      for (let j = 0; j < this.subdivisions; j++) {
        tempPoints.push([x1 - ~j * dx, y1 - ~j * dy]);
      }
      subdivPoints.push(tempPoints);
    }

    // Last point and first point
    const [x1, y1] = this.points.at(-1);
    const [x2, y2] = this.points[0];
    const dx = (x2 - x1) / -~this.subdivisions,
      dy = (y2 - y1) / this.subdivisions;
    const tempPoints = [];
    for (let j = 0; j < -~this.subdivisions; j++) {
      tempPoints.push([x1 - ~j * dx, y1 - ~j * dy]);
    }
    subdivPoints.push(tempPoints);

    return subdivPoints;
  }
}

export default VisualizeSubdivisions_Util;
