import React, { useState } from "react";

const imageUrls = [
  "./images/ball.jpg",
  "./images/העולם שלי 2.jpg",
  "./images/העולם שלי 3.jpg",
  "./images/העולם שלי 4.jpg",
  "./images/העולם שלי 5.jpg",
  "./images/העולם שלי 6.jpg",
  "./images/העולם שלי 7.jpg",
  "./images/העולם שלי 8.jpg",
  "./images/העולם שלי 9.jpg",
  "./images/העולם שלי 10.jpg",
  "./images/העולם שלי 11.jpg",
  "./images/העולם שלי 12.jpg",
  "./images/העולם שלי 13.jpg",
  "./images/העולם שלי 14.jpg",
  "./images/העולם שלי 15.jpg",
  "./images/העולם שלי 16.jpg",
  "./images/העולם שלי 17.jpg",
  "./images/העולם שלי 18.jpg",
  "./images/העולם שלי 19.jpg",
  "./images/העולם שלי 20.jpg",
  "./images/העולם שלי 21.jpg",

  // ... הוסיפי את שאר התמונות כאן
];

const ImageSelectionGame = () => {
  const [stage, setStage] = useState(1);
  const [selectedImagesStage1, setSelectedImagesStage1] = useState([]);
  const [selectedImagesStage2, setSelectedImagesStage2] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [otherPlace, setOtherPlace] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  const toggleImageSelection = (id) => {
    if (isComplete) return;
    if (stage === 1) {
      setSelectedImagesStage1((prev) =>
        prev.includes(id) ? prev.filter((imgId) => imgId !== id) : [...prev, id]
      );
    } else if (stage === 2) {
      setSelectedImagesStage2((prev) =>
        prev.includes(id) ? prev.filter((imgId) => imgId !== id) : [...prev, id]
      );
    } else if (stage === 3) {
      setSelectedPlace(id === selectedPlace ? null : id);
    }
  };

  const handleComplete = () => {
    if (stage < 3) {
      setStage(stage + 1);
    } else {
      setIsComplete(true);
    }
  };

  const getStageTitle = () => {
    switch (stage) {
      case 1:
        return "בחר את התמונות שאתה הכי פחות אוהב";
      case 2:
        return "בחר את התמונות שאתה הכי אוהב";
      case 3:
        return "בחר את המקום שהכי היית רוצה להיות בו";
      default:
        return "";
    }
  };

  const getSelectedImages = () => {
    if (stage === 1) return selectedImagesStage1;
    if (stage === 2) return selectedImagesStage2;
    return selectedPlace !== null ? [selectedPlace] : [];
  };

  const renderSummary = () => (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h2>סיכום הבחירות שלך</h2>
      <p>תמונות שאתה הכי פחות אוהב: {selectedImagesStage1.join(", ")}</p>
      <p>תמונות שאתה הכי אוהב: {selectedImagesStage2.join(", ")}</p>
      <p>
        המקום שהכי היית רוצה להיות בו:{" "}
        {selectedPlace !== null ? selectedPlace + 1 : otherPlace}
      </p>
    </div>
  );

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "20px",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        {getStageTitle()}
      </h1>
      {!isComplete ? (
        <>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: "20px",
            }}
          >
            {imageUrls.map((url, index) => (
              <div
                key={index}
                onClick={() => toggleImageSelection(index)}
                style={{
                  position: "relative",
                  height: "200px",
                  border: getSelectedImages().includes(index)
                    ? "2px solid black"
                    : "2px solid transparent",
                  borderRadius: "10px",
                  overflow: "hidden",
                  cursor: "pointer",
                }}
              >
                <img
                  src={url}
                  alt={`תמונה ${index + 1}`}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                {getSelectedImages().includes(index) && (
                  <div
                    style={{
                      position: "absolute",
                      top: "5px",
                      right: "5px",
                      background: "white",
                      borderRadius: "50%",
                      padding: "2px",
                    }}
                  >
                    ✓
                  </div>
                )}
                <div
                  style={{
                    position: "absolute",
                    bottom: "5px",
                    right: "5px",
                    background: "white",
                    borderRadius: "50%",
                    padding: "2px 6px",
                    fontSize: "12px",
                    fontWeight: "bold",
                  }}
                >
                  {index + 1}
                </div>
              </div>
            ))}
          </div>
          {stage === 3 && (
            <div style={{ marginTop: "20px" }}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedPlace === null}
                  onChange={() => setSelectedPlace(null)}
                />
                אחר
              </label>
              {selectedPlace === null && (
                <input
                  type="text"
                  value={otherPlace}
                  onChange={(e) => setOtherPlace(e.target.value)}
                  placeholder="הזן מקום אחר"
                  style={{ marginLeft: "10px", padding: "5px" }}
                />
              )}
            </div>
          )}
          <p style={{ textAlign: "center", marginTop: "20px" }}>
            תמונות שנבחרו: {getSelectedImages().length}
          </p>
          <button
            onClick={handleComplete}
            style={{
              display: "block",
              margin: "20px auto",
              padding: "10px 20px",
              fontSize: "16px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            {stage === 3 ? "סיים משחק" : "המשך לשלב הבא"}
          </button>
        </>
      ) : (
        renderSummary()
      )}
    </div>
  );
};

export default ImageSelectionGame;
