import React from 'react';
import { useLanguageLocale, useInjectedUIContext } from '@brightlayer-ui/react-auth-shared';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import CardActions, { CardActionsProps } from '@mui/material/CardActions';
import CardContent, { CardContentProps } from '@mui/material/CardContent';
import CardHeader, { CardHeaderProps } from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Typography, { TypographyProps } from '@mui/material/Typography';
import { SxProps, Theme, useTheme } from '@mui/material/styles';
import { BrandedCardContainer } from '../../components';
import ChatBubbleOutline from '@mui/icons-material/ChatBubbleOutline';
import { DialogButtonStyles, DialogActionsStyles, DialogContentStyles, DialogTitleStyles } from '../../styles';
import Box from '@mui/material/Box';

const LinkStyles = (theme: Theme): SxProps<Theme> => ({
    fontWeight: 600,
    color: theme.palette.primary.main,
    textTransform: 'none',
    textDecoration: 'none',
    '&:visited': {
        color: theme.palette.primary.main,
    },
});

/**
 * Content for the Contact Us screen. This is exported separately
 * in the event that a user wishes to build another area in their
 * main application where users can view this information.
 *
 * @category Component
 */
export const ContactSupportContent: React.FC<React.PropsWithChildren<React.PropsWithChildren>> = () => {
    const { t } = useLanguageLocale();
    const theme = useTheme();
    const { contactPhone, contactEmail } = useInjectedUIContext();

    return (
        <>
            <Box sx={{ fontSize: 70, mb: 4, textAlign: 'center' }}>
                <ChatBubbleOutline fontSize={'inherit'} color={'primary'} />
            </Box>
            <Typography variant={'body1'} sx={{ mb: 1 }}>
                {t('blui:CONTACT_SUPPORT.GENERAL_QUESTIONS')}
            </Typography>
            <Typography>
                {t('blui:CONTACT_SUPPORT.SUPPORT_MESSAGE')}
                <Box component="a" href={`mailto:${contactEmail}`} sx={LinkStyles(theme)}>
                    {contactEmail}
                </Box>
                .
            </Typography>
            <Typography variant={'body1'} sx={{ mt: 4, mb: 1 }}>
                {t('blui:CONTACT_SUPPORT.EMERGENCY_SUPPORT')}
            </Typography>
            <Typography>
                {t('blui:CONTACT_SUPPORT.TECHNICAL_ASSISTANCE')}
                <Box component="a" href={`tel:${contactPhone}`} sx={LinkStyles(theme)}>
                    {contactPhone}
                </Box>
                .
            </Typography>
        </>
    );
};

export type ContactSupportProps = {
    title?: string;
    titleProps?: TypographyProps;
    actions?: JSX.Element | JSX.Element[];
    divider?: boolean;
    contactSupportContent?: JSX.Element;
    cardHeaderProps?: CardHeaderProps;
    cardContentProps?: CardContentProps;
    cardActionsProps?: CardActionsProps;
};

/**
 * Container that renders a screen with contact information for
 * support with the application. Contact information is pulled
 * from the context passed into the workflow.
 *
 * @category Component
 */

export const ContactSupport: React.FC<ContactSupportProps> = (props) => {
    const { t } = useLanguageLocale();
    const navigate = useNavigate();
    const theme = useTheme();
    const {
        title = t('blui:USER_MENU.CONTACT_US'),
        titleProps,
        actions = (
            <Button
                variant="contained"
                color="primary"
                disableElevation
                sx={DialogButtonStyles(true)}
                onClick={(): void => navigate(-1)}
            >
                {t('blui:ACTIONS.OKAY')}
            </Button>
        ),
        divider = true,
        contactSupportContent = <ContactSupportContent />,
        cardHeaderProps,
        cardContentProps,
        cardActionsProps,
    } = props;

    return (
        <BrandedCardContainer>
            <CardHeader
                title={
                    <Typography variant={'h6'} {...titleProps}>
                        {title}
                    </Typography>
                }
                sx={DialogTitleStyles(theme)}
                {...cardHeaderProps}
            />
            <CardContent sx={DialogContentStyles(theme)} {...cardContentProps}>
                {contactSupportContent}
            </CardContent>
            {divider ? <Divider /> : undefined}
            <CardActions sx={DialogActionsStyles(theme)} {...cardActionsProps}>
                {actions}
            </CardActions>
        </BrandedCardContainer>
    );
};
