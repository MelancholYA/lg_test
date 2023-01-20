import React from "react";
import starFull from "../assets/star-full.svg";
import starHalf from "../assets/star-half.svg";

type Props = {
  value: number;
};

const star = {
  full: starFull,
  half: starHalf,
};

function Rating({ value }: Props) {
  const stars = [];
  let i;
  for (i = 1; i <= 5; i++) {
    let starType: "full" | "half" = "full";
    if (value < i && value > i - 1) {
      starType = "half";
    }
    stars.push(
      <img
        key={i}
        src={star[starType]}
        alt={`${i} star`}
        className="rating_star"
      />
    );
  }

  return <div className="rating">{stars}</div>;
}

export default Rating;
