import React, { ChangeEvent, useState, useCallback, MutableRefObject } from 'react';
import { useInjectedUIContext, useLanguageLocale } from '@brightlayer-ui/react-auth-shared';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { useTheme } from '@mui/material/styles';
import { SecureTextField } from '../SecureTextField';
import { PasswordRequirements } from './PasswordRequirements';
import { FullDividerStyles, TextFieldStyles } from '../../styles';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import { defaultPasswordRequirements } from '../../constants';

export type ChangePasswordFormProps = {
    onPasswordChange: (passwords: { password: string; confirm: string }) => void;
    initialPassword?: string;
    initialConfirm?: string;
    passwordLabel?: string;
    confirmLabel?: string;
    description?: string;
    passwordRef?: MutableRefObject<any>;
    confirmRef?: MutableRefObject<any>;
    onSubmit?: () => void;
};

/**
 * Component that renders a change password form with a new password and confirm password inputs.
 * It includes callbacks so you can respond to changes in the inputs.
 *
 * @param onPasswordChange Fired when the new password or confirm new password fields value changes
 * @param initialPassword Value to initialize the password field
 * @param initialConfirm Value to initialize the confirm field
 * @param passwordLabel Optional label for the new password field (default = 'Password')
 * @param confirmLabel Optional label for the confirm password field (default = 'Confirm')
 * @param description Optional text to replace the instructional text above the password fields.
 * @param passwordRef Optional ref to forward to the password input.
 * @param confirmRef Optional ref to forward to the confirm password input.
 * @param onSubmit Optional callback function to call when the mini form is submitted.
 *
 * @category Component
 */
export const ChangePasswordForm: React.FC<React.PropsWithChildren<React.PropsWithChildren<ChangePasswordFormProps>>> = (
    props
) => {
    const {
        onPasswordChange,
        initialPassword = '',
        initialConfirm = '',
        passwordLabel,
        confirmLabel,
        description,
        children,
        passwordRef,
        confirmRef,
        onSubmit,
    } = props;
    const { t } = useLanguageLocale();
    const theme = useTheme();

    // Local State
    const [passwordInput, setPasswordInput] = useState(initialPassword);
    const [confirmInput, setConfirmInput] = useState(initialConfirm);
    const [shouldValidateConfirmPassword, setShouldValidateConfirmPassword] = useState(false);
    const [shouldValidatePassword, setShouldValidatePassword] = useState(false);

    const onPassChange = useCallback(
        (newPassword: any) => {
            setPasswordInput(newPassword);
            onPasswordChange({ password: newPassword, confirm: confirmInput });
        },
        [setPasswordInput, onPasswordChange, confirmInput]
    );

    const onConfirmChange = useCallback(
        (newConfirm: any) => {
            setConfirmInput(newConfirm);
            onPasswordChange({ password: passwordInput, confirm: newConfirm });
        },
        [setConfirmInput, onPasswordChange, passwordInput]
    );

    const hasConfirmPasswordError = useCallback(
        (): boolean => shouldValidateConfirmPassword && confirmInput.length !== 0 && confirmInput !== passwordInput,
        [shouldValidateConfirmPassword, confirmInput, passwordInput]
    );

    const { passwordRequirements = defaultPasswordRequirements(t) } = useInjectedUIContext();

    const isValidPassword = useCallback((): boolean => {
        for (let i = 0; i < passwordRequirements.length; i++) {
            if (!new RegExp(passwordRequirements[i].regex).test(passwordInput)) return false;
        }
        return true;
    }, [passwordRequirements, passwordInput]);

    return (
        <>
            <Typography>{description || t('blui:CHANGE_PASSWORD.PASSWORD_INFO')}</Typography>

            <Divider sx={FullDividerStyles(theme)} />

            {children}
            <SecureTextField
                id="password"
                name="password"
                inputRef={passwordRef}
                label={passwordLabel || t('blui:FORMS.PASSWORD')}
                value={passwordInput}
                onChange={(evt: ChangeEvent<HTMLInputElement>): void => onPassChange(evt.target.value)}
                sx={TextFieldStyles(theme)}
                onKeyPress={(e): void => {
                    if (e.key === 'Enter' && confirmRef.current) {
                        confirmRef.current.focus();
                    }
                }}
                error={shouldValidatePassword && !isValidPassword()}
                onBlur={(): void => setShouldValidatePassword(true)}
            />
            <PasswordRequirements sx={{ mt: 2 }} passwordText={passwordInput} />
            <SecureTextField
                id="confirm"
                name="confirm"
                inputRef={confirmRef}
                label={confirmLabel || t('blui:FORMS.CONFIRM_PASSWORD')}
                sx={TextFieldStyles(theme)}
                value={confirmInput}
                onChange={(evt: ChangeEvent<HTMLInputElement>): void => onConfirmChange(evt.target.value)}
                onKeyPress={(e): void => {
                    if (e.key === 'Enter' && onSubmit) onSubmit();
                }}
                error={hasConfirmPasswordError()}
                helperText={hasConfirmPasswordError() ? t('blui:FORMS.PASS_MATCH_ERROR') : ''}
                icon={
                    confirmInput.length !== 0 &&
                    confirmInput === passwordInput && <CheckCircleOutlinedIcon color="success" />
                }
                onBlur={(): void => setShouldValidateConfirmPassword(true)}
            />
        </>
    );
};
