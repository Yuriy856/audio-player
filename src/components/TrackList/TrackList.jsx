import "./TrackList.css";
import PropTypes from "prop-types";
import TrackItem from "../TrackItem";

export default function TrackList(props) {
  const { tracks } = props;

  return (
    <div className="tracklist-container">
      <ul className="track-list">
        {tracks.map((track, index) => {
          return <TrackItem track={track} index={index} key={index} />;
        })}
      </ul>
    </div>
  );
}

// PROPTYPES
TrackList.propTypes = {
  tracks: PropTypes.array.isRequired,
};
