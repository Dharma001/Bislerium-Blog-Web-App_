import React from 'react'

function DeleteAccount() {
  return (
    <div>
      <h1><strong><big>Confirmation: Delete Account</big></strong></h1>
      <br></br>
      <p>Are you sure you want to delete your account? This action cannot be undone.</p>
      <p>By deleting your account, you will lose access to all your data and any associated services.</p>
      <br></br><p>Please consider the following:</p>
      <br></br>
      <ul>
        <li>1. Once deleted, your account information, including your profile, settings, and history, will be permanently removed from our system.</li>
        <li>2. You will no longer be able to log in or access any features tied to your account.</li>
      </ul>
      <br></br>
      <p>If you're certain about deleting your account, please click "Confirm Delete" below. Otherwise, click "Cancel" to retain your account.</p>
      
    </div>
  )
}

export default DeleteAccount
