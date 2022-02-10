import React from "react";

const RecordRankingSection: React.FC<RecordRankingSectionProps> = ({
  moddedResources,
}) => {
  return (
    <section className="section">
      <div className="grid">
        <div className="grid__column">
          <h2>Most completed resources (5)</h2>
          {moddedResources.slice(0, 5).map((y) => (
            <div className="grid__card" key={y.masterId}>
              <h3 className="grid__card-title">{y.code}</h3>
              <p>{y.title}</p>
              <p>{y.records_completed} completions</p>
            </div>
          ))}
        </div>
        <div className="grid__column">
          <h2>Least activity resources (5)</h2>
          {moddedResources
            .filter((x) => x.has_enrolled_only)
            .map((y) => (
              <div className="grid__card" key={y.masterId}>
                <h3 className="grid__card-title">{y.code}</h3>
                <p>{y.title}</p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default RecordRankingSection;
