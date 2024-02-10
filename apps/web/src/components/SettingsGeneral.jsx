"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import TextField from "components/TextField";
import Button from "components/Button";
import LoadingIcon from "components/LoadingIcon";
import { useAuth } from "util/auth";

function SettingsGeneral(props) {
  const auth = useAuth();
  const [pending, setPending] = useState(false);

  const { handleSubmit, register, formState: { errors }, getValues } = useForm();

  const onSubmit = (data) => {
    // Show pending indicator
    setPending(true);

    return auth
      .updateProfile(data)
      .then(() => {
        // Set success status
        props.onStatus({
          type: "success",
          message: "Your profile has been updated",
        });
      })
      .catch((error) => {
        if (error.code === "auth/requires-recent-login") {
          props.onStatus({
            type: "requires-recent-login",
            // Resubmit after reauth flow
            callback: () => onSubmit(data),
          });
        } else {
          // Set error status
          props.onStatus({
            type: "error",
            message: error.message,
          });
        }
      })
      .finally(() => {
        // Hide pending indicator
        setPending(false);
      });
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <TextField
        type="text"
        id="name"
        placeholder="Name"
        label="Name"
        defaultValue={auth.user.name}
        error={errors.name}
        {...register("name", {
          required: "Please enter your name",
        })}
      />
      <TextField
        type="email"
        id="email"
        placeholder="Email"
        label="Email"
        defaultValue={auth.user.email}
        error={errors.email}
        {...register("email",{
          required: "Please enter your email",
        })}
      />
      <Button
        type="submit"
        size="md"
        variant="primary"
        disabled={pending}
        isBlock={true}
      >
        {!pending && <>Save</>}

        {pending && <LoadingIcon className="w-6" />}
      </Button>
    </form>
  );
}

export default SettingsGeneral;
