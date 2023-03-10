import {useMemo, useState} from 'react';
import {useRenderServerComponents} from '~/lib/utils';

import {Button, Text} from '~/components';
import {getInputStyleClasses} from '../../lib/styleUtils';

export function AccountAddressEdit({address, defaultAddress, close}) {
  const isNewAddress = useMemo(() => !Object.keys(address).length, [address]);

  const [saving, setSaving] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [address1, setAddress1] = useState(address?.address1 || '');
  const [address2, setAddress2] = useState(address?.address2 || '');
  const [firstName, setFirstName] = useState(address?.firstName || '');
  const [lastName, setLastName] = useState(address?.lastName || '');
  const [company, setCompany] = useState(address?.company || '');
  const [country, setCountry] = useState(address?.country || '');
  const [province, setProvince] = useState(address?.province || '');
  const [city, setCity] = useState(address?.city || '');
  const [zip, setZip] = useState(address?.zip || '');
  const [phone, setPhone] = useState(address?.phone || '');
  const [isDefaultAddress, setIsDefaultAddress] = useState(defaultAddress);

  // Necessary for edits to show up on the main page
  const renderServerComponents = useRenderServerComponents();

  async function onSubmit(event) {
    event.preventDefault();

    setSaving(true);

    const response = await callUpdateAddressApi({
      id: address?.originalId,
      firstName,
      lastName,
      company,
      address1,
      address2,
      country,
      province,
      city,
      zip,
      phone,
      isDefaultAddress,
    });

    setSaving(false);

    if (response.error) {
      setSubmitError(response.error);
      return;
    }

    renderServerComponents();
    close();
  }

  return (
    <>
      <Text className="mt-4 mb-6" as="h3" size="lead">
        {isNewAddress ? 'Adauga Adresa' : 'Modifica Adresa'}
      </Text>
      <div className="max-w-lg">
        <form noValidate onSubmit={onSubmit}>
          {submitError && (
            <div className="flex items-center justify-center mb-6 bg-red-100 rounded">
              <p className="m-4 text-sm text-red-900">{submitError}</p>
            </div>
          )}
          <div className="mt-3">
            <input
              className={getInputStyleClasses()}
              id="firstname"
              name="firstname"
              required
              type="text"
              autoComplete="given-name"
              placeholder="Prenume"
              aria-label="First name"
              value={firstName}
              onChange={(event) => {
                setFirstName(event.target.value);
              }}
            />
          </div>
          <div className="mt-3">
            <input
              className={getInputStyleClasses()}
              id="lastname"
              name="lastname"
              required
              type="text"
              autoComplete="family-name"
              placeholder="Nume"
              aria-label="Last name"
              value={lastName}
              onChange={(event) => {
                setLastName(event.target.value);
              }}
            />
          </div>
          <div className="mt-3">
            <input
              className={getInputStyleClasses()}
              id="company"
              name="company"
              type="text"
              autoComplete="organization"
              placeholder="Companie"
              aria-label="Company"
              value={company}
              onChange={(event) => {
                setCompany(event.target.value);
              }}
            />
          </div>
          <div className="mt-3">
            <input
              className={getInputStyleClasses()}
              id="street1"
              name="street1"
              type="text"
              autoComplete="address-line1"
              placeholder="Adresa Linia 1"
              required
              aria-label="Address line 1"
              value={address1}
              onChange={(event) => {
                setAddress1(event.target.value);
              }}
            />
          </div>
          <div className="mt-3">
            <input
              className={getInputStyleClasses()}
              id="address2"
              name="address2"
              type="text"
              autoComplete="address-line2"
              placeholder="Adresa Linia 2"
              aria-label="Address line 2"
              value={address2}
              onChange={(event) => {
                setAddress2(event.target.value);
              }}
            />
          </div>
          <div className="mt-3">
            <input
              className={getInputStyleClasses()}
              id="city"
              name="city"
              type="text"
              required
              autoComplete="address-level2"
              placeholder="Oras"
              aria-label="City"
              value={city}
              onChange={(event) => {
                setCity(event.target.value);
              }}
            />
          </div>
          <div className="mt-3">
            <input
              className={getInputStyleClasses()}
              id="state"
              name="state"
              type="text"
              autoComplete="address-level1"
              placeholder="Judet/Sector"
              required
              aria-label="State"
              value={province}
              onChange={(event) => {
                setProvince(event.target.value);
              }}
            />
          </div>
          <div className="mt-3">
            <input
              className={getInputStyleClasses()}
              id="zip"
              name="zip"
              type="text"
              autoComplete="postal-code"
              placeholder="Cod Postal"
              required
              aria-label="Zip"
              value={zip}
              onChange={(event) => {
                setZip(event.target.value);
              }}
            />
          </div>
          <div className="mt-3">
            <input
              className={getInputStyleClasses()}
              id="country"
              name="country"
              type="text"
              autoComplete="country-name"
              placeholder="Tara"
              required
              aria-label="Country"
              value={country}
              onChange={(event) => {
                setCountry(event.target.value);
              }}
            />
          </div>
          <div className="mt-3">
            <input
              className={getInputStyleClasses()}
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              placeholder="Telefon"
              aria-label="Phone"
              value={phone}
              onChange={(event) => {
                setPhone(event.target.value);
              }}
            />
          </div>
          <div className="mt-4">
            <input
              type="checkbox"
              value=""
              name="defaultAddress"
              id="defaultAddress"
              checked={isDefaultAddress}
              className="border-gray-500 rounded-sm cursor-pointer border-1"
              onChange={() => setIsDefaultAddress(!isDefaultAddress)}
            />
            <label
              className="inline-block ml-2 text-sm cursor-pointer"
              htmlFor="defaultAddress"
            >
              Salveaza ca adresa principala.
            </label>
          </div>
          <div className="mt-8">
            <Button
              className="w-full rounded focus:shadow-outline"
              type="submit"
              variant="primary"
              disabled={saving}
            >
              Salveaza
            </Button>
          </div>
          <div>
            <Button
              className="w-full mt-2 rounded focus:shadow-outline"
              variant="secondary"
              onClick={close}
            >
              Anuleaza
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

export async function callUpdateAddressApi({
  id,
  firstName,
  lastName,
  company,
  address1,
  address2,
  country,
  province,
  city,
  phone,
  zip,
  isDefaultAddress,
}) {
  try {
    const res = await fetch(
      id ? `/account/address/${encodeURIComponent(id)}` : '/account/address',
      {
        method: id ? 'PATCH' : 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          company,
          address1,
          address2,
          country,
          province,
          city,
          phone,
          zip,
          isDefaultAddress,
        }),
      },
    );
    if (res.ok) {
      return {};
    } else {
      return res.json();
    }
  } catch (_e) {
    return {
      error: 'A intervenit o eroare. Te rugam sa incerci mai tarziu.',
    };
  }
}
