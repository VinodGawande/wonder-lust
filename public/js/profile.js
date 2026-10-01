document.addEventListener("DOMContentLoaded", () => {
  // Elements
  const editToggleBtn = document.getElementById("editProfileToggleBtn");
  const saveBtn = document.getElementById("saveProfileBtn");
  const cancelBtn = document.getElementById("cancelProfileBtn");
  const actionButtonsBar = document.getElementById("actionButtonsBar");

  const fullNameInput = document.getElementById("fullNameInput");
  const phoneInput = document.getElementById("phoneInput");
  const locationInput = document.getElementById("locationInput");
  const bioInput = document.getElementById("bioTextarea");
  const bioCharCount = document.getElementById("bioCharCount");

  const avatarInput = document.getElementById("avatarFileInput");
  const changePhotoBtn = document.getElementById("changePhotoBtn");
  const removePhotoBtn = document.getElementById("removePhotoBtn");
  const currentAvatarImg = document.getElementById("currentAvatarImg");
  const currentAvatarImgAlt = document.getElementById("currentAvatarImgAlt");
  const navbarAvatarImg = document.querySelector("#userDropdownTrigger img");

  // Keep original baseline values for cancel restoration
  let originalValues = {
    fullName: fullNameInput.value,
    phone: phoneInput.value,
    location: locationInput.value,
    bio: bioInput.value,
  };

  // Toast alert engine
  function showToast(message, isError = false) {
    const existing = document.getElementById("profileDynamicToast");
    if (existing) existing.remove();

    const toast = document.createElement("div");
    toast.id = "profileDynamicToast";
    toast.className = `fixed top-24 left-1/2 transform -translate-x-1/2 z-[100] px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs font-semibold backdrop-blur-md transition-all duration-300 ${
      isError ? "bg-rose-600 text-white" : "bg-emerald-600 text-white"
    }`;

    toast.innerHTML = `
      <i class="fa-solid ${isError ? 'fa-circle-exclamation' : 'fa-circle-check'} text-sm"></i>
      <span>${message}</span>
    `;

    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translate(-50%, -15px)";
      setTimeout(() => toast.remove(), 350);
    }, 3500);
  }

  // Bio character counter
  function updateCharCount() {
    if (bioInput && bioCharCount) {
      bioCharCount.textContent = bioInput.value.length;
    }
  }
  updateCharCount();
  if (bioInput) bioInput.addEventListener("input", updateCharCount);

  // Toggle Edit Mode
  function setEditMode(isEditable) {
    const inputs = [fullNameInput, phoneInput, locationInput, bioInput];
    inputs.forEach((input) => {
      if (isEditable) {
        input.removeAttribute("readonly");
        input.classList.remove("bg-slate-50", "border-transparent", "text-slate-600", "cursor-default");
        input.classList.add("bg-white", "border-slate-200", "text-slate-900", "focus:border-[#ff4757]");
      } else {
        input.setAttribute("readonly", true);
        input.classList.add("bg-slate-50", "border-transparent", "text-slate-600", "cursor-default");
        input.classList.remove("bg-white", "border-slate-200", "text-slate-900", "focus:border-[#ff4757]");
      }
    });

    if (isEditable) {
      actionButtonsBar.classList.remove("hidden");
      editToggleBtn.classList.add("hidden");
      fullNameInput.focus();
    } else {
      actionButtonsBar.classList.add("hidden");
      editToggleBtn.classList.remove("hidden");
    }
  }

  if (editToggleBtn) {
    editToggleBtn.addEventListener("click", () => setEditMode(true));
  }

  // Cancel edits
  if (cancelBtn) {
    cancelBtn.addEventListener("click", () => {
      fullNameInput.value = originalValues.fullName;
      phoneInput.value = originalValues.phone;
      locationInput.value = originalValues.location;
      bioInput.value = originalValues.bio;
      updateCharCount();
      setEditMode(false);
    });
  }

  // Save edits via AJAX
  if (saveBtn) {
    saveBtn.addEventListener("click", async () => {
      const fullName = fullNameInput.value.trim();
      const phone = phoneInput.value.trim();
      const location = locationInput.value.trim();
      const bio = bioInput.value.trim();

      if (!fullName) {
        showToast("Full Name is required.", true);
        fullNameInput.focus();
        return;
      }

      if (bio.length > 300) {
        showToast("Bio cannot exceed 300 characters.", true);
        bioInput.focus();
        return;
      }

      saveBtn.disabled = true;
      const originalText = saveBtn.innerText;
      saveBtn.innerText = "Saving...";

      try {
        const res = await fetch("/api/profile", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ fullName, phone, location, bio }),
        });

        const data = await res.json();
        if (data.success) {
          originalValues = { fullName, phone, location, bio };
          setEditMode(false);
          showToast(data.message || "Profile updated successfully.");
        } else {
          showToast(data.message || "Unable to update profile.", true);
        }
      } catch (err) {
        console.error(err);
        showToast("Unable to update profile.", true);
      } finally {
        saveBtn.disabled = false;
        saveBtn.innerText = originalText;
      }
    });
  }

  // Change Photo trigger
  if (changePhotoBtn && avatarInput) {
    changePhotoBtn.addEventListener("click", () => avatarInput.click());
  }

  // Avatar upload
  if (avatarInput) {
    avatarInput.addEventListener("change", async () => {
      const file = avatarInput.files[0];
      if (!file) return;

      const allowed = ["image/jpeg", "image/png", "image/webp"];
      if (!allowed.includes(file.type)) {
        showToast("Invalid image format. Allowed: JPG, PNG, WEBP.", true);
        avatarInput.value = "";
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        showToast("Image must be smaller than 5MB.", true);
        avatarInput.value = "";
        return;
      }

      // Preview immediately
      const reader = new FileReader();
      reader.onload = (e) => {
        if (currentAvatarImg) currentAvatarImg.src = e.target.result;
        if (currentAvatarImgAlt) currentAvatarImgAlt.src = e.target.result;
      };
      reader.readAsDataURL(file);

      // Upload via FormData
      const formData = new FormData();
      formData.append("avatar", file);

      changePhotoBtn.disabled = true;
      const origText = changePhotoBtn.innerHTML;
      changePhotoBtn.innerHTML = `<span>Uploading...</span>`;

      try {
        const res = await fetch("/api/profile/avatar", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();
        if (data.success) {
          if (currentAvatarImg) currentAvatarImg.src = data.avatarUrl;
          if (currentAvatarImgAlt) currentAvatarImgAlt.src = data.avatarUrl;
          if (navbarAvatarImg) navbarAvatarImg.src = data.avatarUrl;
          showToast(data.message || "Profile photo updated.");
        } else {
          showToast(data.message || "Upload failed.", true);
        }
      } catch (err) {
        console.error(err);
        showToast("Upload failed.", true);
      } finally {
        changePhotoBtn.disabled = false;
        changePhotoBtn.innerHTML = origText;
        avatarInput.value = "";
      }
    });
  }

  // Remove Photo handler
  if (removePhotoBtn) {
    removePhotoBtn.addEventListener("click", async () => {
      const confirmed = confirm("Remove your profile photo?");
      if (!confirmed) return;

      try {
        const res = await fetch("/api/profile/avatar", {
          method: "DELETE",
        });

        const data = await res.json();
        if (data.success) {
          if (currentAvatarImg) currentAvatarImg.src = data.avatarUrl;
          if (currentAvatarImgAlt) currentAvatarImgAlt.src = data.avatarUrl;
          if (navbarAvatarImg) navbarAvatarImg.src = data.avatarUrl;
          showToast(data.message || "Profile photo removed.");
        } else {
          showToast(data.message || "Could not remove photo.", true);
        }
      } catch (err) {
        console.error(err);
        showToast("Could not remove photo.", true);
      }
    });
  }
});
