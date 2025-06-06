'use client';

import type React from 'react';
import { useState } from 'react';
import { useServerInsertedHTML } from 'next/navigation';
import { ServerStyleSheet, StyleSheetManager,  } from 'styled-components';
import { GlobalStyles } from '@/styles/globals';

export const Registry = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());

	useServerInsertedHTML(() => {
		const styles = styledComponentsStyleSheet.getStyleElement();
		styledComponentsStyleSheet.instance.clearTag();
		return <>{styles}</>;
	});

	if (typeof window !== 'undefined') return <>{children}</>;

	return (
		<StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
			<GlobalStyles />
			{children}
		</StyleSheetManager>
	);
};
