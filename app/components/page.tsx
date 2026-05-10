"use client";
import React from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Text } from "@/components/ui/Text";
import { Spinner } from "@/components/ui/Spinner";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/utils/CN";
import { SelectionInput } from "@/components/ui/Input/SelectionInput";

export default function ComponentsPage() {
  return (
    <div className="container mx-auto py-12 px-4 space-y-12">
      <header className="space-y-4">
        <Text variant="h1" className="text-4xl font-bold tracking-tight">
          Component Library
        </Text>
        <Text variant="P9" className="text-zinc-500 max-w-2xl">
          A showcase of the reusable UI primitives built for the Nova template.
        </Text>
      </header>

      {/* Typography Section */}
      <section className="space-y-6">
        <div className="border-b pb-2">
          <Text variant="h2" className="text-2xl font-semibold">Typography</Text>
        </div>
        <div className="space-y-4 p-6 bg-zinc-50 dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800">
          <Text variant="h1">Heading 1 (h1)</Text>
          <Text variant="h2">Heading 2 (h2)</Text>
          <Text variant="h3">Heading 3 (h3)</Text>
          <Text variant="h4">Heading 4 (h4)</Text>
          <Text variant="h5">Heading 5 (h5)</Text>
          <Text variant="B1">Body 1 (B1)</Text>
          <Text variant="B2">Body 2 (B2)</Text>
          <Text variant="P15">Paragraph 15px (P15)</Text>
          <Text variant="P14">Paragraph 14px (P14)</Text>
        </div>
      </section>

      {/* Buttons Section */}
      <section className="space-y-6">
        <div className="border-b pb-2">
          <Text variant="h2" className="text-2xl font-semibold">Buttons</Text>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 bg-zinc-50 dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800">
          <div className="space-y-4">
            <Text variant="h4" className="text-lg font-medium">Variants</Text>
            <div className="flex flex-wrap gap-4">
              <Button title="Primary" variant="primary" />
              <Button title="Secondary" variant="secondary" />
              <Button title="Outline" variant="primary" />
              <Button title="Danger" variant="danger" />
              <Button title="Ghost" variant="noStyle" />
            </div>
          </div>
          <div className="space-y-4">
            <Text variant="h4" className="text-lg font-medium">Sizes & Icons</Text>
            <div className="flex flex-wrap items-center gap-4">
              <Button title="Small" size="small" />
              <Button title="Large" size="large" />
              <Button title="With Icon" prefixIcon="siderProfile" />
              <Button variant="primary" icon="siderSettings" />
              <Button title="Disabled" disabled />
            </div>
          </div>
        </div>
      </section>

      {/* Inputs Section */}
      <section className="space-y-6">
        <div className="border-b pb-2">
          <Text variant="h2" className="text-2xl font-semibold">Inputs</Text>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 bg-zinc-50 dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800">
          <div className="space-y-6">
            <Input
              type="text"
              label="Default Input"
              placeholder="Enter text..."
              prefixIcon="searchNormal"
            />
            <Input
              type="password"
              label="Password Input"
              placeholder="Enter password..."
              suffixIcon="authEye"
            />
            <Input
              type="text"
              label="Number Input"
              placeholder="0"
            />
            <Input
              type="text"
              label="Date Input"
            />
          </div>
          <div className="space-y-6">
            <SelectionInput
              options={[
                { value: "1", label: "Option 1", i18Label: "" },
                { value: "2", label: "Option 2", i18Label: "" },
                { value: "3", label: "Option 3", i18Label: "" },
              ]}
              label="Selection Input"
              placeholder="Select an option"
            />
            <div className="space-y-2">
              <Text variant="P14" className="font-medium">Rate Input</Text>
              <Input type="rate" defaultValue={3.5} />
            </div>
            <Input
              type="text"
              label="Error State"
              errorMsg="This field is required"
              required
            />
          </div>
        </div>
      </section>

      {/* Feedback Section */}
      <section className="space-y-6">
        <div className="border-b pb-2">
          <Text variant="h2" className="text-2xl font-semibold">Feedback & Status</Text>
        </div>
        <div className="flex flex-wrap items-center gap-12 p-6 bg-zinc-50 dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-4">
            <Text variant="P14">Spinner:</Text>
            <Spinner />
          </div>
          <div className="flex items-center gap-4">
            <Text variant="P14">Icons:</Text>
            <Icon name="doneAll" size={24} className="text-green-500" />
            <Icon name="warning" size={24} className="text-amber-500" />
            <Icon name="close" size={24} className="text-red-500" />
            <Icon name="documentText" size={24} className="text-blue-500" />
          </div>
        </div>
      </section>

    </div>
  );
}
