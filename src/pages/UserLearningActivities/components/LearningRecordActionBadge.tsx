import React from 'react';
import Badge from 'react-bootstrap/Badge';
import { learningRecordVerbBadgeColorMap, learningRecordVerbLabelMap } from '../constants';

type Props = {
    verb: string
}

export default function LearningRecordActionBadge(props: Props): React.ReactElement {
    const { verb } = props;
    return (
        <Badge 
            bg={learningRecordVerbBadgeColorMap[verb]} 
            text={
                learningRecordVerbBadgeColorMap[verb] === "light"|| 
                learningRecordVerbBadgeColorMap[verb] === "warning" ? "dark": "light"
            }
        >
            {learningRecordVerbLabelMap[verb]}
        </Badge>
    );
}