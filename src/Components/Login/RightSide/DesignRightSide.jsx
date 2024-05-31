import Elipse1 from "../../../Assets/Elipses/Elipse1.png";
import Elipse2 from "../../../Assets/Elipses/Elipse2.png";
import Elipse3 from "../../../Assets/Elipses/Elipse3.png";
import Elipse4 from "../../../Assets/Elipses/Elipse4.png";
import Elipse5 from "../../../Assets/Elipses/Elipse5.png";
import Elipse6 from "../../../Assets/Elipses/Elipse6.png";

function DesignRightSide() {
  return (
    <>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "200px",
          height: "200px",
        }}
      >
        <img
          src={Elipse4}
          style={{
            position: "absolute",
            top: 0,
            left: "20px",
            width: "100%",
            height: "auto",
            zIndex: 1,
          }}
        />
        <img
          src={Elipse3}
          style={{
            position: "relative",
            zIndex: 2,
          }}
        />
        <img
          src={Elipse5}
          style={{
            position: "relative",
            zIndex: 3,
            right: "20%",
            bottom: "45%",
          }}
        />
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          width: "200px",
          height: "200px",
        }}
      >
        <img
          src={Elipse6}
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            height: "auto",
            zIndex: 3,
          }}
        />
        <img
          src={Elipse2}
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            height: "auto",
            zIndex: 2,
          }}
        />
        <img
          src={Elipse1}
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            height: "auto",
            zIndex: 1,
          }}
        />
      </div>
    </>
  );
}

export default DesignRightSide
