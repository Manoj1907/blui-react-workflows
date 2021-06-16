import React from 'react';
import ReactDOM from 'react-dom';
import 'regenerator-runtime/runtime';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { AcceptEula } from './subScreens/AcceptEula';
import { AccountDetails } from './subScreens/AccountDetails';
import { CreateAccount } from './subScreens/CreateAccount';
import { CreatePassword } from './subScreens/CreatePassword';
import { ExistingAccountComplete } from './subScreens/ExistingAccountComplete';
import { RegistrationComplete } from './subScreens/RegistrationComplete';
import { VerifyEmail } from './subScreens/VerifyEmail';
import {
    AccountUIActionContext,
    // AccountUIActionContext,
    AuthUIContextProvider,
    SecurityContextProvider,
    // RegistrationActionContext,
    // RegistrationActionsCreator,
} from '@pxblue/react-auth-shared';
import { ContactSupport } from './ContactSupport';
import { ForgotPassword } from './ForgotPassword';
// import { InviteRegistrationPager } from './InviteRegistrationPager';
import { BrowserRouter } from 'react-router-dom';
import { RoutingContext } from '../contexts/RoutingContext';
import { Login } from './Login';
// import { PreAuthContainer } from './PreAuthContainer';
import { ResetPassword } from './ResetPassword';
// import { SelfRegistrationPager } from './SelfRegistrationPager';
import { Splash } from './Splash';
// import { RoutingContext } from '../contexts/RoutingContext';
// import { BrowserRouter } from 'react-router-dom';

Enzyme.configure({ adapter: new Adapter() });

// jest.mock('@pxblue/react-auth-shared', () => ({
//     ...jest.requireActual('@pxblue/react-auth-shared'),
//     useLanguageLocale: jest.fn().mockReturnValue(() => ({ t: {} })),
// }));

// import i18n from 'i18next';
// import { initReactI18next } from 'react-i18next';

// // Mock t function
// export const t = (key: string, params?: any): any => {
//     if (key === 'key.with.params') {
//         return `key.with.params.${params.param}`;
//     }

//     return key;
// };

// // Mock react-i18next
// void i18n.use(initReactI18next).init({
//     lng: 'en',
//     fallbackLng: 'en',
//     ns: ['common'],
//     defaultNS: 'common',
//     resources: {
//         en: {
//             common: {},
//         },
//     },
// });

// // Mock your i18n
// jest.mock('i18next', () => ({
//     useTranslation: (): any => ({
//         t,
//         i18n: {
//             language: 'en',
//             // eslint-disable-next-line no-console
//             changeLanguage: jest.fn().mockImplementation((lang: string) => console.log(lang)),
//         },
//     }),
//     withTranslation: () => (component: any): any => {
//         component.defaultProps = { ...component.defaultProps, t };
//         return component;
//     },
// }));

describe('AcceptEula tests', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        const onEulaChanged = jest.fn();
        ReactDOM.render(
            <AcceptEula eulaAccepted={false} loadEula={(): void => {}} onEulaChanged={onEulaChanged} />,
            div
        );
        ReactDOM.unmountComponentAtNode(div);
    });
});

describe('AccountDetails tests', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        const onDetailsChanged = jest.fn();
        ReactDOM.render(<AccountDetails onDetailsChanged={onDetailsChanged} />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});

describe('CreateAccount tests', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        const onEmailChanged = jest.fn();
        ReactDOM.render(<CreateAccount onEmailChanged={onEmailChanged} />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});

describe('CreatePassword tests', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        const onPasswordChanged = jest.fn();
        const authUIActions = jest.fn();
        const registrationUIActions = jest.fn();

        ReactDOM.render(
            <AuthUIContextProvider authActions={authUIActions} registrationActions={registrationUIActions}>
                <CreatePassword onPasswordChanged={onPasswordChanged} />
            </AuthUIContextProvider>,
            div
        );
        ReactDOM.unmountComponentAtNode(div);
    });
});

describe('ExistingAccountComplete tests', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<ExistingAccountComplete />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});

describe('RegistrationComplete tests', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <RegistrationComplete
                firstName={'Betty'}
                lastName={'White'}
                email={'potentiallyImmortal@email.com'}
                organization={'Not Your Typical Granny Inc.'}
            />,
            div
        );
        ReactDOM.unmountComponentAtNode(div);
    });
});

describe('VerifyEmail tests', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        const onVerifyCodeChanged = jest.fn();
        const onResendVerificationEmail = jest.fn();
        ReactDOM.render(
            <VerifyEmail
                onVerifyCodeChanged={onVerifyCodeChanged}
                onResendVerificationEmail={onResendVerificationEmail}
            />,
            div
        );
        ReactDOM.unmountComponentAtNode(div);
    });
});

describe('ContactSupport tests', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        const authUIActions = jest.fn();
        const registrationUIActions = jest.fn();

        ReactDOM.render(
            <AuthUIContextProvider authActions={authUIActions} registrationActions={registrationUIActions}>
                <ContactSupport />
            </AuthUIContextProvider>,
            div
        );
        ReactDOM.unmountComponentAtNode(div);
    });
});

jest.mock('@pxblue/react-auth-shared', () => ({
    ...jest.requireActual('@pxblue/react-auth-shared'),
    useAccountUIActions: jest.fn().mockReturnValue(() => {}),
}));

describe('ForgotPassword tests', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        const authUIActions = jest.fn();
        const registrationUIActions = jest.fn();
        const accountUIActions = {
            initiateSecurity: jest.fn(),
            logIn: jest.fn(),
            forgotPassword: jest.fn(),
            verifyResetCode: jest.fn(),
            setPassword: jest.fn(),
            changePassword: jest.fn(),
        };
        const accountUIDispatch = jest.fn();

        ReactDOM.render(
            <AccountUIActionContext.Provider value={{ actions: accountUIActions, dispatch: accountUIDispatch }}>
                <AuthUIContextProvider authActions={authUIActions} registrationActions={registrationUIActions}>
                    <ForgotPassword />
                </AuthUIContextProvider>
            </AccountUIActionContext.Provider>,
            div
        );
        ReactDOM.unmountComponentAtNode(div);
    });
});

jest.mock('@pxblue/react-auth-shared', () => ({
    ...jest.requireActual('@pxblue/react-auth-shared'),
    useSecurityState: jest.fn().mockReturnValue({}),
}));

describe('Login tests', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        const authUIActions = jest.fn();
        const registrationUIActions = jest.fn();
        const accountUIActions = {
            initiateSecurity: jest.fn(),
            logIn: jest.fn(),
            forgotPassword: jest.fn(),
            verifyResetCode: jest.fn(),
            setPassword: jest.fn(),
            changePassword: jest.fn(),
        };
        const accountUIDispatch = jest.fn();

        const defaultRoutes = {
            LOGIN: '/login',
            FORGOT_PASSWORD: '/forgot-password',
            RESET_PASSWORD: '/reset-password',
            REGISTER_INVITE: '/register/invite',
            REGISTER_SELF: '/register/create-account',
            SUPPORT: '/support',
        };

        ReactDOM.render(
            <BrowserRouter>
                <RoutingContext.Provider value={{ routes: defaultRoutes }}>
                    <SecurityContextProvider>
                        <AccountUIActionContext.Provider
                            value={{ actions: accountUIActions, dispatch: accountUIDispatch }}
                        >
                            <AuthUIContextProvider
                                authActions={authUIActions}
                                registrationActions={registrationUIActions}
                            >
                                <Login />
                            </AuthUIContextProvider>
                        </AccountUIActionContext.Provider>
                    </SecurityContextProvider>
                </RoutingContext.Provider>
            </BrowserRouter>,
            div
        );
        ReactDOM.unmountComponentAtNode(div);
    });
});

// describe('PreAuthContainer tests', () => {
//     it('renders without crashing', () => {
//         const div = document.createElement('div');
//         ReactDOM.render(
//             <SecurityContextProvider>
//                 <PreAuthContainer />
//             </SecurityContextProvider>,
//             div
//         );
//         ReactDOM.unmountComponentAtNode(div);
//     });
// });

type QueryParams = {
    code?: string;
    email?: string;
    search?: string;
};

jest.mock('../hooks/useQueryString', () => ({
    useQueryString: (): QueryParams => ({ search: 'test-search', code: 'test', email: 'test@email.com' }),
}));

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useLocation: jest.fn().mockReturnValue('test-location'),
}));

jest.mock('@pxblue/react-auth-shared', () => ({
    ...jest.requireActual('@pxblue/react-auth-shared'),
    useRegistrationUIActions: jest.fn().mockReturnValue(() => ({
        // loadEULA: jest.fn(),
        // requestRegistrationCode: jest.fn(),
        // validateUserRegistrationRequest: jest.fn(),
        // completeRegistration: jest.fn(),
        dispatch: jest.fn(),
    })),
}));

// @TODO: Fix "Error: Uncaught [TypeError: registrationActions.dispatch is not a function]"

// describe('InviteRegistrationPager tests', () => {
//     it('renders without crashing', () => {
//         const div = document.createElement('div');
//         const authUIActions = jest.fn();
//         const registrationUIActions = jest.fn();

//         const defaultRoutes = {
//             LOGIN: '/login',
//             FORGOT_PASSWORD: '/forgot-password',
//             RESET_PASSWORD: '/reset-password',
//             REGISTER_INVITE: '/register/invite',
//             REGISTER_SELF: '/register/create-account',
//             SUPPORT: '/support',
//         };

//         ReactDOM.render(
//             <BrowserRouter>
//                 <RoutingContext.Provider value={{ routes: defaultRoutes }}>
//                     <AuthUIContextProvider authActions={authUIActions} registrationActions={registrationUIActions}>
//                         <InviteRegistrationPager />
//                     </AuthUIContextProvider>
//                 </RoutingContext.Provider>
//             </BrowserRouter>,
//             div
//         );
//         ReactDOM.unmountComponentAtNode(div);
//     });
// });

// @TODO: Fix "Error: Uncaught [TypeError: registrationActions.dispatch is not a function]"

// describe('SelfRegistrationPager tests', () => {
//     it('renders without crashing', () => {
//         const div = document.createElement('div');
//         const authUIActions = jest.fn();
//         const registrationUIActions = jest.fn();

//         const defaultRoutes = {
//             LOGIN: '/login',
//             FORGOT_PASSWORD: '/forgot-password',
//             RESET_PASSWORD: '/reset-password',
//             REGISTER_INVITE: '/register/invite',
//             REGISTER_SELF: '/register/create-account',
//             SUPPORT: '/support',
//         };

//         ReactDOM.render(
//             <BrowserRouter>
//                 <RoutingContext.Provider value={{ routes: defaultRoutes }}>
//                     <AuthUIContextProvider authActions={authUIActions} registrationActions={registrationUIActions}>
//                         <SelfRegistrationPager />
//                     </AuthUIContextProvider>
//                 </RoutingContext.Provider>
//             </BrowserRouter>,
//             div
//         );
//         ReactDOM.unmountComponentAtNode(div);
//     });
// });

describe('Splash tests', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        const authUIActions = jest.fn();
        const registrationUIActions = jest.fn();

        ReactDOM.render(
            <AuthUIContextProvider authActions={authUIActions} registrationActions={registrationUIActions}>
                <Splash />
            </AuthUIContextProvider>,
            div
        );
        ReactDOM.unmountComponentAtNode(div);
    });
});

describe('ResetPassword tests', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        const authUIActions = jest.fn();
        const registrationUIActions = jest.fn();
        const defaultRoutes = {
            LOGIN: '/login',
            FORGOT_PASSWORD: '/forgot-password',
            RESET_PASSWORD: '/reset-password',
            REGISTER_INVITE: '/register/invite',
            REGISTER_SELF: '/register/create-account',
            SUPPORT: '/support',
        };
        const authActions = {
            initiateSecurity: jest.fn(),
            logIn: jest.fn(),
            forgotPassword: jest.fn(),
            verifyResetCode: jest.fn(),
            setPassword: jest.fn(),
            changePassword: jest.fn(),
        };
        const authDispatch = jest.fn();

        ReactDOM.render(
            <BrowserRouter>
                <RoutingContext.Provider value={{ routes: defaultRoutes }}>
                    <AccountUIActionContext.Provider value={{ actions: authActions, dispatch: authDispatch }}>
                        <AuthUIContextProvider authActions={authUIActions} registrationActions={registrationUIActions}>
                            <ResetPassword />
                        </AuthUIContextProvider>
                    </AccountUIActionContext.Provider>
                </RoutingContext.Provider>
            </BrowserRouter>,
            div
        );
        ReactDOM.unmountComponentAtNode(div);
    });
});
