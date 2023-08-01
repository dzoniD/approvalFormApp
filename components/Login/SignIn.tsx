'use client';
// import { Button, InlineText, InputField, Title } from '@gigatron/ui-web/base';
// import { GraphQLClient } from 'graphql-request';
import Link from 'next/link';
import React, { useState, type FC, useCallback, useEffect } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
// import { OtherLoginOptions } from 'components/Signin/OtherLoginOptions';
// import { type FieldsType, type FormValues } from 'components/Signin/Signin';
import { validation } from './validation';

import { useRouter } from 'next/navigation'
// import { graphql, type FragmentType, useFragment } from 'gql';

// import { clientClient, serverClient } from 'lib/graphql-client';
import { EyeIcon } from './icons/eyeIcon';
import { EyeSlashIcon } from './icons/eye-slash';

export interface FormValues {
    email: string;
    password: string;
    username:string;
    'confirm-password':string;
  }
  
  export interface FieldsType {
    id: keyof FormValues;
    placeholder: string;
    label: string;
    validation: {
      pattern: {
        value: RegExp;
        message: string;
      };
      required: {
        value: boolean;
        message: string;
      };
      validate?: (val:string) => string | undefined
    };
    name:string;
    isError: boolean;
    errorMessage: string | undefined;
    aria: boolean | 'true' | 'false' | 'grammar' | 'spelling' | undefined;
    type?: string;
    children?: JSX.Element;
  }

interface LoginFieldsType extends Omit<FieldsType, 'id'> {
  id: 'email' | 'password';
}

export const SignIn: FC = () => {
  const router = useRouter()

  const { register, watch,formState,getValues, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onBlur',
  });

  const { errors } = formState;
  const [showPassword, setShowPassword] = useState(false);

  const fields: FieldsType[] = [
    {
      id: 'username',
      label:'Username',
      name:'username',
      placeholder: 'Username',
      validation: validation.textValidationRequirements,
      isError: !!errors.username?.type,
      errorMessage: errors.username?.message,
      aria: errors.username ? 'true' : 'false',
    },
    {
      id: 'email',
      label:'Email',
      name:'email',
      placeholder: 'Email address',
      validation: validation.emailValidationRequirements,
      isError: !!errors.email?.type,
      errorMessage: errors.email?.message,
      aria: errors.email ? 'true' : 'false',
    },
    {
      id: 'password',
      placeholder: 'Lozinka',
      name:'password',
      label:'Password',
      type: showPassword ? 'text' : 'password',
      validation: validation.passwordValidationRequirements,
      isError: !!errors.password?.type,
      errorMessage: errors.password?.message,
      aria: errors.password ? 'true' : 'false',
      children: (
        <button
          className="relative cursor-pointer p-3"
          onClick={(e) => {
            e.preventDefault();
            setShowPassword(!showPassword);
          }}
        >
          {showPassword ? <EyeIcon /> : <EyeSlashIcon />}
        </button>
      ),
    },
    {
      id: 'confirm-password',
      placeholder: 'Lozinka',
      name:'confirm-password',
      label:'Confirm password',
      type: showPassword ? 'text' : 'password',
      validation: {...validation.passwordValidationRequirements, validate: (val) => {
        console.log(watch('password'),val)
        if (watch('password') != val) {
          return "Your passwords do no match";
        }
      }},
      isError: !!errors['confirm-password']?.type,
      errorMessage: errors['confirm-password']?.message,
      aria: errors['confirm-password'] ? 'true' : 'false',
      children: (
        <button
          className="relative cursor-pointer p-3"
          onClick={(e) => {
            e.preventDefault();
            setShowPassword(!showPassword);
          }}
        >
          {showPassword ? <EyeIcon /> : <EyeSlashIcon />}
        </button>
      ),
    },
  ];

  const logIn: SubmitHandler<FormValues> = (
    data
  ) => {
    console.log(data);
    router.push('/login')

  };

  return (
    <>
      <div className="relative w-[550px] max-w-[600px] rounded-md border bg-white px-7 pb-14 pt-7">
        <h1 className='mb-4 text-center text-lg font-bold'>Sign up form</h1>{' '}
        <form onSubmit={handleSubmit(logIn)}>
          {fields.map((field,i) => {
            return (

              <div key={"field" + i} className="flex  max-w-[490px] w-full flex-col mb-5">
              {/* here goes Label component */}
              {/* {label && ( */}
                <label className="block text-left" htmlFor={field.id}>
                  {field.label}
                </label>
              {/* )} */}
              <div className="relative flex grow items-center">
                <input
                  type={field.type}
                  id={field.id}
                  // value={field.value}
                  {...register(field.id,field.validation)}
                  placeholder={field.placeholder}
                  className={`py-2.5 pr-2.5 mt-1  text-base w-full focus-visible:outline-none h-10  pl-3 rounded-md border border-solid placeholder:text-gGray-600 bg-white  border-black/10 undefined`}
                  // aria-describedby={ariaDescribedBy}
                  // aria-label={ariaLabel}
                  // disabled={disabled}
                  // ref={ref}
                  // {...restProps}
                ></input>
                {/* <Input
                  isError={field.isError}
                  id={field.id}
                  {...restProps}
                  ref={ref}
                  elementType={field.elementPosition === 'right' ? 'none' : elementType}
                /> */}
                <div
                  className={`absolute flex justify-center h-10 text-center items-center right-0`} //${position}`}
                >
                  {field.children}
                </div>
              </div>
              {field.isError ? (
                <div className="ml-2 mt-1 text-red-600 font-normal">
                  {field.errorMessage}
                </div>
              ) : (
                ''
              )}
            </div>
              // <InputField
              //   key={field.id}
              //   id={field.id}
              //   type={field?.type || 'text'}
              //   variant="normal"
              //   placeholder={field.placeholder}
              //   {...register(field.id, field.validation)}
              //   isError={field.isError}
              //   errorMessage={field.errorMessage}
              //   aria-invalid={field.aria}
              // >
              //   {field?.children}
              // </InputField>
            );
          })}
          <Link href={'/'} className="mb-5 inline-block">
            <span className="!text-blue-600">
              {' '}
              Forgot your password?
            </span>
          </Link>
          <div>
          <button
          type="submit"
          className={`rounded py-1.5 px-5 bg-white border border-slate-300 hover:bg-bgPrimary h-11 w-full`}
          // {...restProps}
        >
          Log in
        </button>
            {/* <button
              label="Prijavite se"
              scheme="blueSecondary"
              variant="squared"
              className="h-11 w-full"
              type="submit"
            ></button> */}
          </div>
        </form>
        {/* <OtherLoginOptions /> */}
      </div>
    </>
  );
};
