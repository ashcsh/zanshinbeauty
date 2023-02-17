import {useState} from 'react';
import {useNavigate} from '@shopify/hydrogen/client';
import {getInputStyleClasses} from '../../lib/styleUtils';

export function AccountPasswordResetForm({id, resetToken}) {
  const navigate = useNavigate();

  const [submitError, setSubmitError] = useState(null);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(null);
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [passwordConfirmError, setPasswordConfirmError] = useState(null);

  function passwordValidation(form) {
    setPasswordError(null);
    setPasswordConfirmError(null);

    let hasError = false;

    if (!form.password.validity.valid) {
      hasError = true;
      setPasswordError(
        form.password.validity.valueMissing
          ? 'Te rugam sa introduci o parola.'
          : 'Parola trebuie sa aiba minim 6 caractere.',
      );
    }

    if (!form.passwordConfirm.validity.valid) {
      hasError = true;
      setPasswordConfirmError(
        form.password.validity.valueMissing
          ? 'Te rugam sa reintroduci parola'
          : 'Parola trebuie sa aiba minim 6 caractere.',
      );
    }

    if (password !== passwordConfirm) {
      hasError = true;
      setPasswordConfirmError('Parolele introduse nu sunt la fel.');
    }

    return hasError;
  }

  async function onSubmit(event) {
    event.preventDefault();

    if (passwordValidation(event.currentTarget)) {
      return;
    }

    const response = await callPasswordResetApi({
      id,
      resetToken,
      password,
    });

    if (response.error) {
      setSubmitError(response.error);
      return;
    }

    navigate('/account');
  }

  return (
    <div className="flex justify-center my-24 px-4">
      <div className="max-w-md w-full">
        <h1 className="text-4xl">Schimba Parola.</h1>
        <p className="mt-4">Te rugam sa introduci o parola noua.</p>
        <form noValidate className="pt-6 pb-8 mt-4 mb-4" onSubmit={onSubmit}>
          {submitError && (
            <div className="flex items-center justify-center mb-6 bg-zinc-500">
              <p className="m-4 text-s text-contrast">{submitError}</p>
            </div>
          )}
          <div className="mb-3">
            <input
              className={`mb-1 ${getInputStyleClasses(passwordError)}`}
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="Parola"
              aria-label="Password"
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus
              value={password}
              minLength={8}
              required
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
            <p
              className={`text-red-500 text-xs ${
                !passwordError ? 'invisible' : ''
              }`}
            >
              {passwordError} &nbsp;
            </p>
          </div>
          <div className="mb-3">
            <input
              className={`mb-1 ${getInputStyleClasses(passwordConfirmError)}`}
              id="passwordConfirm"
              name="passwordConfirm"
              type="password"
              autoComplete="current-password"
              placeholder="Reintrodu Parola"
              aria-label="Re-enter password"
              value={passwordConfirm}
              required
              minLength={8}
              onChange={(event) => {
                setPasswordConfirm(event.target.value);
              }}
            />
            <p
              className={`text-red-500 text-xs ${
                !passwordConfirmError ? 'invisible' : ''
              }`}
            >
              {passwordConfirmError} &nbsp;
            </p>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-primary text-contrast rounded py-2 px-4 focus:shadow-outline block w-full"
              type="submit"
            >
              Salveaza
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export async function callPasswordResetApi({id, resetToken, password}) {
  try {
    const res = await fetch(`/account/reset`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({id, resetToken, password}),
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
