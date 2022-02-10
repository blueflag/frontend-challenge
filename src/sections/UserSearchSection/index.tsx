import React from "react";

const UserSearchSection: React.FC<UserSearchSectionProps> = ({
  searchTerm,
  handleSearch,
  searchResults,
}) => (
  <section className="section">
    <input
      className="search__input"
      value={searchTerm}
      onChange={handleSearch}
      type="text"
      placeholder="Find user by name..."
    />
    <div>
      {!searchResults
        ? "No results"
        : searchResults.map((x, i) => {
            return (
              <div className="search__card" key={x.id}>
                <h3>
                  {i + 1}. {x.familyName}, {x.givenName}
                </h3>
                {x.learning_records.map((l, i2) => {
                  const dateStamp = new Date(
                    l.learning_record_timestamp
                  ).toUTCString();
                  return (
                    <div
                      className="search__record"
                      key={l.learning_resource_id + l.user_id}
                    >
                      <h4>{l.resource_code + " - " + l.resource_title}</h4>
                      <p className="search__badge">{l.learning_record_verb}</p>
                      <p>{dateStamp}</p>
                      <code>{l.learning_resource_id}</code>
                    </div>
                  );
                })}
              </div>
            );
          })}
    </div>
  </section>
);

export default UserSearchSection;
