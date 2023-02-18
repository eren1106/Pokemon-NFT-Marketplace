import React, {useEffect} from 'react';
import { setTitle } from '../../features/selectedTitleSlice';
import { useAppDispatch } from '../../hooks';

interface IPageWrapperProps {
    children?: React.ReactNode;
    title: string;
}

const PageWrapper: React.FunctionComponent<IPageWrapperProps> = ({ children, title }) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setTitle(title));
    }, [dispatch, title]);

    return <div>
        {children}
    </div>;
};

export default PageWrapper;
