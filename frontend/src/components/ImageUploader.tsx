"use client";

import { ChangeEvent, useState, DragEvent, MouseEvent } from "react";
import { UploadCloud, X, Loader2, Image as ImageIcon } from "lucide-react";

interface ImageUploaderProps {
  onSearch: (file: File) => void;
  loading: boolean;
}

export default function ImageUploader({
  onSearch,
  loading,
}: ImageUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = (selectedFile: File) => {
    if (!selectedFile.type.startsWith("image/")) {
      alert("Please select a valid image file");
      return;
    }
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) handleFile(selectedFile);
  };

  const handleDragOver = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) handleFile(droppedFile);
  };

  const handleRemove = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setFile(null);
    setPreview(null);
  };

  const handleSearch = () => {
    if (!file) return;
    onSearch(file);
  };

  return (
    <div className="w-full max-w-xl space-y-4">
      {/* Upload Box */}
      <label
        htmlFor="image-upload"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative flex min-h-[280px] cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed p-8 transition-all duration-300 ${
          isDragging
            ? "border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/30 dark:border-indigo-500 scale-[1.01]"
            : "border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-gray-400 dark:hover:border-gray-700 hover:bg-gray-50/50 dark:hover:bg-gray-800/50 shadow-sm"
        }`}
      >
        {preview ? (
          <div className="relative group w-full flex items-center justify-center">
            <img
              src={preview}
              alt="Selected preview"
              className="max-h-60 rounded-2xl object-contain shadow-md"
            />
            <button
              type="button"
              onClick={handleRemove}
              className="absolute top-2 right-2 rounded-full bg-gray-900/80 p-2 text-white backdrop-blur-sm transition hover:bg-red-600"
              title="Remove image"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="rounded-full bg-indigo-50 dark:bg-indigo-950/50 p-4 text-indigo-600 dark:text-indigo-400 shadow-inner">
              <UploadCloud className="h-8 w-8" />
            </div>
            <div>
              <p className="text-base font-semibold text-gray-800 dark:text-gray-200">
                Click to upload <span className="font-normal text-gray-500 dark:text-gray-400">or drag and drop</span>
              </p>
              <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                SVG, PNG, JPG or WEBP
              </p>
            </div>
          </div>
        )}

        <input
          id="image-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>

      {/* Action Button */}
      <button
        type="button"
        onClick={handleSearch}
        disabled={!file || loading}
        className="w-full flex items-center justify-center space-x-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all duration-200 hover:opacity-95 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
      >
        {loading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Searching similar images...</span>
          </>
        ) : (
          <>
            <ImageIcon className="h-5 w-5" />
            <span>Search Similar Images</span>
          </>
        )}
      </button>
    </div>
  );
}