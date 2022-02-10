import React from "react";

const UserRankingSection: React.FC<UserRankingSectionProps> = ({
  sortedUsersAsc,
  sortedUsersDesc,
}) => {
  return (
    <section id="user-rank-section" className="section">
      <div className="grid">
        <div className="grid__column">
          <h2>Most active users (5)</h2>
          {sortedUsersAsc.slice(0, 5).map((x) => (
            <div className="grid__card" key={x.id}>
              <h3 className="grid__card-title">
                {x.givenName} {x.familyName}
              </h3>
              <p className="grid__card-jobtitle">{x.jobPositions}</p>
              <p className="grid__card-jobscomplete">
                <strong className="grid__card-count">
                  {x.completed_records}
                </strong>{" "}
                activities completed
              </p>
            </div>
          ))}
        </div>
        <div className="grid__column">
          <h2>Least active users (5)</h2>
          {sortedUsersDesc.slice(0, 5).map((x) => (
            <div className="grid__card" key={x.id}>
              <h3 className="grid__card-title">
                {x.givenName} {x.familyName}
              </h3>
              <p className="grid__card-jobtitle">{x.jobPositions}</p>
              <p className="grid__card-jobscomplete">
                <strong className="grid__card-count">
                  {x.completed_records}
                </strong>{" "}
                activities completed
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UserRankingSection;
