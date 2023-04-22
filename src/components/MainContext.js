import React from "react";
import { useEffect, useReducer, createContext, useState } from "react";

const MainContext = createContext(null);

const reducer = (state, action) => {
  switch (action.type) {
    case "getUserData": { // user list
      return {
        ...state,
        userdata: action.payload,
      };
    }
    case "getLearningRecordData": { // learning record list
      return {
        ...state,
        learningrecorddata: action.payload,
      };
    }

    case "getLearningResourceData": { // learning resources list
      return {
        ...state,
        learningresourcedata: action.payload,
      };
    }

    case "getURLData": { // URL list
      return {
        ...state,
        urldata: action.payload,
      };
    }

    case "getMyLearningRecordData": { //selected learning data
      return {
        ...state,
        mylearningrecorddata: action.payload,
      };
    }

    case "getMyLearningRecordSummaryData": { // selected learning record data
      return {
        ...state,
        mylearningrecordsummarydata: action.payload,
      };
    }

    case "getUserCompletionData": { // user's completion list
      return {
        ...state,
        usercompletiondata: action.payload,
      };
    }

    case "getLearningResourceSummaryData": { // learning resources list
      return {
        ...state,
        learningresourcesummarydata: action.payload,
      };
    }

    default:
      return {
        ...state,
      };
  }
};

const ACTION = {
  GET_USER_DATA: "getUserData",
  GET_LEARNINGRECORD_DATA: "getLearningRecordData",
  GET_LEARNINGRESOURCE_DATA: "getLearningResourceData",
  GET_URL_DATA: "getURLData",
  GET_MYLEARNINGRECORD_DATA: "getMyLearningRecordData",
  GET_MYLEARNINGRECORDSUMMARY_DATA: "getMyLearningRecordSummaryData",
  GET_USERCOMPLETION_DATA: "getUserCompletionData",
  GET_LEARNINGRESOURCESUMMARY_DATA: "getLearningResourceSummaryData",
};

export const MainContextProvider = ({ children }) => {
  const [selectedUser, setSelectedUser] = useState(""); // state for selected user in dropdown
  const [state, dispatch] = useReducer(reducer, {
    userdata: [],
    learningrecorddata: [],
    learningresourcedata: [],
    urldata: [],
    mylearningrecorddata: [],
    mylearningrecordsummarydata: [],
    usercompletiondata: [],
    learningresourcesummarydata: [],

  }); 

  // Request Data for user list
  const getUserData = () => {
    let paramURL = state.urldata.userURL;

    let xhr = new XMLHttpRequest();
    if (paramURL !== "" && paramURL !== undefined) {
      xhr.open("GET", paramURL);
      xhr.send();
      if (xhr.readyState === 1) {
        xhr.onload = () => {
          let _data = JSON.parse(xhr.response);

          if (_data.length > 0) {
            dispatch({
              type: ACTION.GET_USER_DATA,
              payload: _data,
            });
          }
        };
      }
    }
  };

  // Request data for learning resources list
  const getLearningResourceData = () => {
    let paramURL = state.urldata.learningResourceURL;

    let xhr = new XMLHttpRequest();
    if (paramURL !== "" && paramURL !== undefined) {
      xhr.open("GET", paramURL);
      xhr.send();
      if (xhr.readyState === 1) {
        xhr.onload = () => {
          let _data = JSON.parse(xhr.response);

          if (_data.length > 0) {
            dispatch({
              type: ACTION.GET_LEARNINGRESOURCE_DATA,
              payload: _data,
            });
          }
        };
      }
    }
  };

  // request learning record list
  const getLearningRecordData = () => {
    let paramURL = state.urldata.learningRecordURL;

    let xhr = new XMLHttpRequest();
    if (paramURL !== "" && paramURL !== undefined) {
      xhr.open("GET", paramURL);
      xhr.send();
      if (xhr.readyState === 1) {
        xhr.onload = () => {
          let _data = JSON.parse(xhr.response);

          if (_data.length > 0) {
            dispatch({
              type: ACTION.GET_LEARNINGRECORD_DATA,
              payload: _data,
            });
          }
        };
      }
    }
  };

  // request learning record selected user
  const doGetMyLearningRecord = () => {

    // filter learning record for selected user
    let _mylearningrecorddata = state.learningrecorddata.filter(
      (fItems) => fItems.user_id === selectedUser
    );

    //get data from learning resource data and merge to learning record data
    const allData = _mylearningrecorddata.map((data1) => {
      const matchingData2 = state.learningresourcedata.find(
        (data2) => data2.masterId === data1.learning_resource_id
      );
      return matchingData2 ? { ...data1, ...matchingData2 } : data1;
    });

    //get the total count per status
    const statusSummary = {};
    for (let i = 0; i < allData.length; i++) {
      const status = allData[i].learning_record_verb;
      statusSummary[status] = (statusSummary[status] || 0) + 1;
    }
    //convert into array
    const listOfArrays = Object.entries(statusSummary);

    //sort data by code
    allData.sort((a, b) => a.code.localeCompare(b.code));

    //dispatch data
    dispatch({
      type: ACTION.GET_MYLEARNINGRECORD_DATA,
      payload: allData.length > 0 ? allData : [],
    });

    //dispatch data
    dispatch({
      type: ACTION.GET_MYLEARNINGRECORDSUMMARY_DATA,
      payload: listOfArrays.length > 0 ? listOfArrays : [],
    });
  };

  const doGetUserCompletionData = () => {
    const _allCompleteData = state.learningrecorddata.map((data1) => {
      const matchingData2 = state.userdata.find(
        (data2) => data2.id === data1.user_id
      );
      return matchingData2 ? { ...data1, ...matchingData2 } : data1;
    });

    // get unit status
    const _statusList = [
      ...new Set(_allCompleteData.map((item) => item.learning_record_verb)),
    ];

    // get unique user
    const _userList = [
      ...new Set(_allCompleteData.map((item) => item.user_id)),
    ];

    const userSummary = [];
    _userList.map((uItem) => {
      let _statusSummary = [];

      _statusList.map((sItem) => {
        let _userStatusCount = _allCompleteData.filter(
          (fItems) =>
            fItems.learning_record_verb === sItem.toString() &&
            fItems.user_id === uItem.toString()
        );

        _statusSummary.push(
          {
            _status: sItem,
            tCount: _userStatusCount.length,
          }
        );
      });

      userSummary.push({
        userId: uItem,
        statusSum: _statusSummary,
      });
    });

    const allCompleteData = userSummary.map((data1) => {
      const matchingData2 = state.userdata.find(
        (data2) => data2.id === data1.userId
      );
      return matchingData2 ? { ...data1, ...matchingData2 } : data1;
    });

    dispatch({
      type: ACTION.GET_USERCOMPLETION_DATA,
      payload: allCompleteData.length > 0 ? allCompleteData : [],
    });
  };

const doGetLearningResourceSummaryData = () => {

  const _allCompleteData = state.learningrecorddata.map((data1) => {
    const matchingData2 = state.learningresourcedata.find(
      (data2) => data2.masterId === data1.learning_resource_id
    );
    return matchingData2 ? { ...data1, ...matchingData2 } : data1;
  });


  const _statusList = [
    ...new Set(_allCompleteData.map((item) => item.learning_record_verb)),
  ];
  const _learningResourceList = [
    ...new Set(_allCompleteData.map((item) => item.masterId)),
  ];

  const learningResourceSummary = [];
  // map into learning resource data
  _learningResourceList.map((uItem) => {
    let _statusSummary = [];

    _statusList.map((sItem) => {
      let _learningResourceStatusCount = _allCompleteData.filter(
        (fItems) =>
          fItems.learning_record_verb === sItem.toString() &&
          fItems.masterId === uItem.toString()
      );

      _statusSummary.push(
        {
          _status: sItem,
          tCount: _learningResourceStatusCount.length,
        }
      );
    });

    learningResourceSummary.push({
      id: uItem,
      statusSum: _statusSummary,
    });
  });

  const allCompleteData = learningResourceSummary.map((data1) => {
    const matchingData2 = state.learningresourcedata.find(
      (data2) => data2.masterId === data1.id
    );
    return matchingData2 ? { ...data1, ...matchingData2 } : data1;
  });

  dispatch({
    type: ACTION.GET_LEARNINGRESOURCESUMMARY_DATA,
    payload: allCompleteData.length > 0 ? allCompleteData : [],
  });



}

  useEffect(() => {
    doGetMyLearningRecord();
  }, [selectedUser]);

  useEffect(() => {
    getUserData();
    getLearningResourceData();
    getLearningRecordData();
  }, [state.urldata]);

  useEffect(() => {
    doGetUserCompletionData();
  }, [state.userdata, state.learningrecorddata]);

  useEffect(() => {
    doGetLearningResourceSummaryData();
  }, [state.learningresourcedata, state.learningrecorddata]);

  useEffect(() => {
    dispatch({
      type: ACTION.GET_URL_DATA,
      payload: {
        userURL: "http://localhost:3000/users.json",
        learningRecordURL: "http://localhost:3000/learning-records.json",
        learningResourceURL: "http://localhost:3000/learning-resources.json",
      },
    });
 }, []);   //set url list when component did mount

  return (
    <MainContext.Provider
      value={{
        state,
        setSelectedUser,
        selectedUser,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export default MainContext;
