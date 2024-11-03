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

  it("Find subdivides a triangle", () => {
    const { polyPoints, subdivPointsLine, netLines, intersectionPoints } = buildStringArtObject(
      points1,
      2
    );

    const expectedPolyPoints = [
      [50, 25],
      [100, 50],
      [200, 30],
      [300, 10],
      [150, 5],
      [0, 0],
    ];
    expect(polyPoints).toEqual(expectedPolyPoints);

    const expectedSubdivPointsLine = [
      [
        [66 + 2 / 3, 33 + 1 / 3],
        [83 + 1 / 3, 41 + 2 / 3],
      ],
      [
        [133 + 1 / 3, 43 + 1 / 3],
        [166 + 2 / 3, 36 + 2 / 3],
      ],
      [
        [233 + 1 / 3, 23 + 1 / 3],
        [266 + 2 / 3, 16 + 2 / 3],
      ],
      [
        [250, 8 + 1 / 3],
        [200, 6 + 2 / 3],
      ],
      [
        [100, 3 + 1 / 3],
        [50, 1 + 2 / 3],
      ],
      [
        [16 + 2 / 3, 8 + 1 / 3],
        [33 + 1 / 3, 16 + 2 / 3],
      ],
    ];
    for (const row in expectedSubdivPointsLine) {
      for (const col in expectedSubdivPointsLine[row]) {
        expect(subdivPointsLine[row][col][0]).toBeCloseTo(
          expectedSubdivPointsLine[row][col][0],
          10
        );
        expect(subdivPointsLine[row][col][1]).toBeCloseTo(
          expectedSubdivPointsLine[row][col][1],
          10
        );
      }
    }

    const expectedNetLines = [
      [50, 25, 133 + 1 / 3, 43 + 1 / 3],
      [66 + 2 / 3, 33 + 1 / 3, 166 + 2 / 3, 36 + 2 / 3],
      [200, 30, 83 + 1 / 3, 41 + 2 / 3],
      [200, 30, 250, 8 + 1 / 3],
      [233 + 1 / 3, 23 + 1 / 3, 200, 6 + 2 / 3],
      [150, 5, 266 + 2 / 3, 16 + 2 / 3],
      [150, 5, 16 + 2 / 3, 8 + 1 / 3],
      [100, 3 + 1 / 3, 33 + 1 / 3, 16 + 2 / 3],
      [50, 25, 50, 1 + 2 / 3],
    ];
    for (const row in expectedNetLines) {
      expect(netLines[row][0]).toBeCloseTo(expectedNetLines[row][0], 10);
      expect(netLines[row][1]).toBeCloseTo(expectedNetLines[row][1], 10);
      expect(netLines[row][2]).toBeCloseTo(expectedNetLines[row][2], 10);
      expect(netLines[row][3]).toBeCloseTo(expectedNetLines[row][3], 10);
    }

    const expectedIntersectionPoints = [
      [50, 25],
      [91 + 2 / 3, 34 + 1 / 6],
      [141 + 2 / 3, 35 + 5 / 6],
      [200, 30],
      [225, 19 + 1 / 6],
      [208 + 1 / 3, 10 + 5 / 6],
      [150, 5],
      [83 + 1 / 3, 6 + 2 / 3],
      [50, 13 + 1 / 3],
      [50, 25],
    ];
    for (const p in expectedIntersectionPoints) {
      expect(intersectionPoints[p][0]).toBeCloseTo(expectedIntersectionPoints[p][0], 10);
      expect(intersectionPoints[p][1]).toBeCloseTo(expectedIntersectionPoints[p][1], 10);
    }
  });
});
