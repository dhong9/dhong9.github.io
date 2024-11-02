/**
=========================================================
* Danyo-1.2
=========================================================

* Copyright 2024 Danyo (https://www.danyo.tech)

Coded by www.danyo.tech

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// Unit to test
import { buildStringArtObject } from "projects/artistTools/visualizeSubdivisions/VisualizeSubdivisions_Util";

describe("VisualizeSubdivisions_Util", () => {
  const points1 = [
    [0, 0],
    [100, 50],
    [300, 10],
  ];

  it("Find midpoints", () => {
    const { polyPoints, subdivPointsLine, netLines } = buildStringArtObject(points1, 2);

    const expectedPolyPoints = [
      [50, 25],
      [100, 50],
      [200, 30],
      [300, 10],
      [150, 5],
      [0, 0],
    ];
    expect(polyPoints).toEqual(expectedPolyPoints);
  });
});
