import {useState} from 'react';
import {useNavigate} from '@shopify/hydrogen/client';
import {getInputStyleClasses} from '../../lib/styleUtils';

export function AccountActivateForm({id, activationToken}) {
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
          ? 'Te rugam sa reintroduci parola.'
          : 'Parola trebuie sa aiba minim 6 caractere.',
      );
    }

    if (!form.passwordConfirm.validity.valid) {
      hasError = true;
      setPasswordConfirmError(
        form.password.validity.valueMissing
          ? 'Te rugam sa reintroduci parola.'
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

    const response = await callActivateApi({
      id,
      activationToken,
      password,
    });

    if (response.error) {
      setSubmitError(response.error);
      return;
    }

    navigate('/account');
  }

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-md">
        <h1 className="text-4xl">Activeaza Cont.</h1>
        <p className="mt-4">Adauga o parola pentru a activa contul.</p>
        <form noValidate className="pt-6 pb-8 mt-4 mb-4" onSubmit={onSubmit}>
          {submitError && (
            <div className="flex items-center justify-center mb-6 bg-primary/30">
              <p className="m-4 text-s text-contrast">{submitError}</p>
            </div>
          )}
          <div className="mb-4">
            <input
              className={`mb-1 ${getInputStyleClasses(passwordError)}`}
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="Password"
              aria-label="Password"
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
          <div className="mb-4">
            <input
              className={`mb-1 ${getInputStyleClasses(passwordConfirmError)}`}
              id="passwordConfirm"
              name="passwordConfirm"
              type="password"
              autoComplete="current-password"
              placeholder="Re-enter password"
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
              className="block w-full px-4 py-2 text-contrast uppercase bg-primary focus:shadow-outline"
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

async function callActivateApi({id, activationToken, password}) {
  try {
    const res = await fetch(`/account/activate`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({id, activationToken, password}),
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
