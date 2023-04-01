import { useContext, useEffect, useState } from "react";
import { DatasContext } from "../context/DatasContext";
import { ResourcesContainer, Card } from "../components/resources-comp/styles";
const Resources = () => {
  const data = useContext(DatasContext);
  type DataNum = {
    [key: string]: number;
  };
  const [datasNum, setDatasNum] = useState<DataNum[]>([]);

  useEffect(() => {
    const dataArr: DataNum[] = [];
    if (data?.resources !== undefined) {
      data.resources.map((dataResource) => {
        const dataNumbers: DataNum = {
          attempt: 0,
          complete: 0,
          fail: 0,
          pass: 0,
          enrol: 0,
          attend: 0,
        };
        data.records.map((dataRecord) => {
          if (dataResource.masterId === dataRecord.learning_resource_id) {
            dataNumbers[dataRecord.learning_record_verb.toLowerCase()] =
              dataNumbers[dataRecord.learning_record_verb.toLowerCase()] + 1;
          }
        });
        dataArr.push(dataNumbers);
        setDatasNum(dataArr);
      });
    }
  }, [data?.resources, data?.records]);
  return (
    <ResourcesContainer>
      {data?.resources.map((data, i) => {
        return (
          <Card key={data.masterId}>
            <p className="code">{data.code}</p>
            <p className="title">{data.title}</p>
            <hr />
            <p className="datas">Attempt: {datasNum[i].attempt}</p>
            <p className="datas">Completed: {datasNum[i].complete}</p>
            <p className="datas">Fail: {datasNum[i].fail}</p>
            <p className="datas">Pass: {datasNum[i].pass}</p>
            <p className="datas">Enroll: {datasNum[i].enrol}</p>
            <p className="datas">Attend: {datasNum[i].attend}</p>
          </Card>
        );
      })}
    </ResourcesContainer>
  );
};

export default Resources;
