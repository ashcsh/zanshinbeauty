import {useState} from 'react';
import {useNavigate, Link} from '@shopify/hydrogen/client';
import {getInputStyleClasses} from '../../lib/styleUtils';

export function AccountLoginForm({shopName}) {
  const navigate = useNavigate();

  const [hasSubmitError, setHasSubmitError] = useState(false);
  const [showEmailField, setShowEmailField] = useState(true);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(null);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(null);

  function onSubmit(event) {
    event.preventDefault();

    setEmailError(null);
    setHasSubmitError(false);
    setPasswordError(null);

    if (showEmailField) {
      checkEmail(event);
    } else {
      checkPassword(event);
    }
  }

  function checkEmail(event) {
    if (event.currentTarget.email.validity.valid) {
      setShowEmailField(false);
    } else {
      setEmailError('Te rugam sa introduci un email valid');
    }
  }

  async function checkPassword(event) {
    const validity = event.currentTarget.password.validity;
    if (validity.valid) {
      const response = await callLoginApi({
        email,
        password,
      });

      if (response.error) {
        setHasSubmitError(true);
        resetForm();
      } else {
        navigate('/account');
      }
    } else {
      setPasswordError(
        validity.valueMissing
          ? 'Te rugam sa introduci o parola.'
          : 'Parola trebuie sa aiba minim 6 caractere.',
      );
    }
  }

  function resetForm() {
    setShowEmailField(true);
    setEmail('');
    setEmailError(null);
    setPassword('');
    setPasswordError(null);
  }

  return (
    <div className="flex justify-center my-24 px-4">
      <div className="max-w-md w-full">
        <h1 className="text-4xl">Autentificare</h1>
        <form noValidate className="pt-6 pb-8 mt-4 mb-4" onSubmit={onSubmit}>
          {hasSubmitError && (
            <div className="flex items-center justify-center mb-6 bg-zinc-500">
              <p className="m-4 text-s text-contrast">
                Ne pare rau! Email-ul sau Parola introduse nu au fost gasite. Te rugam sa incerci din nou.
              </p>
            </div>
          )}
          {showEmailField && (
            <EmailField
              shopName={shopName}
              email={email}
              setEmail={setEmail}
              emailError={emailError}
            />
          )}
          {!showEmailField && (
            <ValidEmail email={email} resetForm={resetForm} />
          )}
          {!showEmailField && (
            <PasswordField
              password={password}
              setPassword={setPassword}
              passwordError={passwordError}
            />
          )}
        </form>
      </div>
    </div>
  );
}

export async function callLoginApi({email, password}) {
  try {
    const res = await fetch(`/account/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email, password}),
    });
    if (res.ok) {
      return {};
    } else {
      return res.json();
    }
  } catch (error) {
    return {
      error: error.toString(),
    };
  }
}

function EmailField({email, setEmail, emailError, shopName}) {
  return (
    <>
      <div className="mb-3">
        <input
          className={`mb-1 ${getInputStyleClasses(emailError)}`}
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="Adresa Email"
          aria-label="Email address"
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        {!emailError ? (
          ''
        ) : (
          <p className={`text-red-500 text-xs`}>{emailError} &nbsp;</p>
        )}
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-primary rounded text-contrast py-2 px-4 focus:shadow-outline block w-full"
          type="submit"
        >
          Pasul Urmator
        </button>
      </div>
      <div className="flex items-center mt-8 border-t  border-gray-300">
        <p className="align-baseline text-sm mt-6">
          Esti nou pe {shopName}? &nbsp;
          <Link className="inline underline" to="/account/register">
            Creeaza Cont Nou
          </Link>
        </p>
      </div>
    </>
  );
}

function ValidEmail({email, resetForm}) {
  return (
    <div className="mb-3 flex items-center justify-between">
      <div>
        <p>{email}</p>
        <input
          className="hidden"
          type="text"
          autoComplete="username"
          value={email}
          readOnly
        ></input>
      </div>
      <div>
        <button
          className="inline-block align-baseline text-sm underline"
          type="button"
          onClick={resetForm}
        >
          Schimba Email
        </button>
      </div>
    </div>
  );
}

function PasswordField({password, setPassword, passwordError}) {
  return (
    <>
      <div className="mb-3">
        <input
          className={`mb-1 ${getInputStyleClasses(passwordError)}`}
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          placeholder="Parola"
          aria-label="Password"
          value={password}
          minLength={8}
          required
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        {!passwordError ? (
          ''
        ) : (
          <p className={`text-red-500 text-xs`}> {passwordError} &nbsp;</p>
        )}
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-primary text-contrast rounded py-2 px-4 focus:shadow-outline block w-full"
          type="submit"
        >
          Autentificare
        </button>
      </div>
      <div className="flex items-center justify-between mt-4">
        <div className="flex-1"></div>
        <Link
          className="inline-block align-baseline text-sm text-primary/50"
          to="/account/recover"
        >
          Am uitat parola
        </Link>
      </div>
    </>
  );
}
