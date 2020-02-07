import React from 'react';
import uuid from 'uuid/v4';

// Styles
import './styles/elections.css'

const Elections = ({elections}) => {

  // Map elections
  const electionMapper = () => {
    return elections.map((election) => {
      const date = (new Date(election.date).toString().slice(0, 15));
      let votingMethods = election['district-divisions'][0]['voting-methods'];
      const calendar = election.source.notes;
      const website = election['polling-place-url-shortened'];
      
      // Map voting methods
      votingMethods = votingMethods.map((method) => {
        return method.primary ? 
          <p key={uuid()}>Type: {method.type}</p>
          : 
          null
      });

      return (
        <div 
          key={uuid()}
          className="election"
        >
          <h4>{election.description}</h4>
          <div className="election-info">
            <p>{date}</p>
            <div>{votingMethods}</div>
              <a
                href={calendar}
                target="_blank"
                title={election.description}>
                  Election Dates
              </a>
              <a
                href={website}
                target="_blank"
                title={election.description}>
                  More Info
              </a>
          </div>
        </div>
      )
    });
  };

  return (
    <div className="Elections">
      {electionMapper()}
    </div>
  );
}

export default Elections;

