import React, { useState } from 'react';
import { Card, Col, List, Row } from 'antd';

type Props = {
	isLoading: boolean;
	data: User[];
}

export default function UsersList(props: Props): React.ReactElement {
	const {isLoading, data} = props;

	return (
		<List
			grid={{
				gutter: 16,
				xs: 1,
				sm: 2,
				md: 3,
				lg: 4,
				xl: 4,
				xxl: 4,
			}}
			loading={isLoading}
			dataSource={data}
			renderItem={(user: User) => (
				<List.Item>
					<Card size='small' title={`${user.givenName} ${user.familyName}`}>
						User Activity
					</Card>
				</List.Item>
			)}
		/>
	);
}
