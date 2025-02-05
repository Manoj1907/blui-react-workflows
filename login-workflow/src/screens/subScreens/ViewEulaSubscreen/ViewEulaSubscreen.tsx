import React, { useCallback, useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import FormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import DOMPurify from 'dompurify';
import Box, { BoxProps } from '@mui/material/Box';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import { cx } from '@emotion/css';
import i18n from '../../../translations/i18n';
import {
    ViewEulaSubscreenClasses,
    ViewEulaSubscreenClassKey,
    getViewEulaSubscreenUtilityClass,
} from './ViewEulaSubscreenClasses';
import { useLanguageLocale } from '../../../auth-shared';

export type ViewEulaSubscreenProps = {
    eulaAccepted: boolean;
    onEulaCheckboxChanged: (accepted: boolean) => void;
    loadEulaAction: (language: string) => Promise<string>;
    htmlEula?: boolean;
    eulaError?: string;
    agreeTerms?: string;
    classes?: ViewEulaSubscreenClasses;
    slots?: { loader?: React.ElementType; eulaContent?: React.ElementType; checkboxLabel?: React.ElementType };
    slotProps?: {
        loader?: any;
        eulaContent?: BoxProps;
        checkboxLabel?: FormControlLabelProps;
    };
};

const useUtilityClasses = (ownerState: ViewEulaSubscreenProps): Record<ViewEulaSubscreenClassKey, string> => {
    const { classes } = ownerState;

    const slots = {
        loader: ['loader'],
        eulaContent: ['eulaContent'],
        checkboxLabel: ['checkboxLabel'],
    };

    return composeClasses(slots, getViewEulaSubscreenUtilityClass, classes);
};

/**
 * Component that renders a screen displaying the EULA and requests acceptance via a checkbox.
 *
 * @param eulaAccepted true if the checkbox should be checked
 *
 * @param eulaContent the content to render for the EULA. Can be a plain string or HTML
 *
 * @param onEulaCheckboxChanged function to call when the state of the checkbox is changed
 *
 * @param loadEula function to call to retrieve the eulaContent
 *
 * @param htmlEula true if the EULA should be rendered as HTML
 *
 * @param eulaError error message if the EULA fails to load
 *
 * @param agreeTerms to override terms and conditions text
 *
 * @param slots used for each slot in `ContactSupport`
 *
 * @param slotProps applied to each slot
 *
 * @category Component
 */

export const ViewEulaSubscreen: React.FC<ViewEulaSubscreenProps> = (props) => {
    const { t } = useLanguageLocale();
    const {
        eulaAccepted,
        onEulaCheckboxChanged,
        htmlEula,
        eulaError,
        agreeTerms = t('blui:REGISTRATION.EULA.AGREE_TERMS'),
        classes = {},
        slots = {},
        slotProps = {},
        loadEulaAction,
    } = props;

    const defaultClasses = useUtilityClasses(props);
    const CheckboxLabel = slots.checkboxLabel ?? FormControlLabel;
    const Loader = slots.loader ?? Typography;
    const [eulaContent, setEulaContent] = useState<string>();
    const [isEulaLoaded, setIsEulaLoaded] = useState(false);

    // Load the Eula if we don't have it yet
    const loadAndCacheEula = useCallback(async (): Promise<void> => {
        if (!eulaContent) {
            setEulaContent(t('blui:REGISTRATION.EULA.LOADING'));
            try {
                const eulaText = await loadEulaAction(i18n.language);
                setEulaContent(eulaText);
                setIsEulaLoaded(true);
            } catch {
                setEulaContent(eulaError);
            }
        }
    }, [eulaContent, setEulaContent, loadEulaAction, eulaError, t]);

    useEffect(() => {
        void loadAndCacheEula();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {!htmlEula && (
                <Loader
                    sx={{ flex: '1 1 0px', overflow: 'auto' }}
                    className={cx(defaultClasses.loader, classes.loader)}
                    {...slotProps.loader}
                >
                    {eulaContent}
                </Loader>
            )}
            {htmlEula && (
                <Box
                    sx={{ flex: '1 1 0px', overflow: 'auto' }}
                    className={cx(defaultClasses.eulaContent, classes.eulaContent)}
                    component={slots.eulaContent}
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(eulaContent) }}
                    {...slotProps.eulaContent}
                ></Box>
            )}
            <CheckboxLabel
                control={
                    <Checkbox
                        color={'primary'}
                        checked={eulaAccepted}
                        disabled={!isEulaLoaded}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
                            onEulaCheckboxChanged(event.target.checked)
                        }
                    />
                }
                label={agreeTerms}
                sx={{ flex: '0 0 auto', mr: 0, mt: 2 }}
                className={cx(defaultClasses.checkboxLabel, classes.checkboxLabel)}
                {...slotProps.checkboxLabel}
            />
        </>
    );
};
