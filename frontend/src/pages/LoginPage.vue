<template>
  <div class="login-page">
    <div class="login-container">
      <div class="login-card">
        <!-- Logo Section -->
        <div class="logo-section">
          <div class="logo-container">
            <svg class="logo-icon" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="3" width="7" height="7" fill="currentColor" opacity="0.9"/>
              <rect x="3" y="14" width="7" height="7" fill="currentColor" opacity="0.7"/>
              <rect x="14" y="3" width="7" height="7" fill="currentColor" opacity="0.7"/>
              <rect x="14" y="14" width="7" height="7" fill="currentColor" opacity="0.5"/>
            </svg>
            <div class="logo-text">GRIDFlow</div>
          </div>
          <div class="logo-subtitle">Project Management System</div>
        </div>

        <!-- Login Form -->
        <q-form @submit="handleLogin" class="login-form">
          <div class="form-title">Sign In</div>
          <div class="form-subtitle">Enter your credentials to access your account</div>

          <!-- Error Message -->
          <div v-if="errorMessage" class="error-message">
            <q-icon name="warning" size="18px" class="q-mr-xs" />
            {{ errorMessage }}
          </div>

          <!-- Username Field -->
          <q-input
            v-model="username"
            outlined
            label="Username"
            placeholder="Enter your username"
            class="login-input"
            :rules="[val => !!val || 'Username is required']"
          >
            <template v-slot:prepend>
              <q-icon name="person" />
            </template>
          </q-input>

          <!-- Password Field -->
          <q-input
            v-model="password"
            outlined
            :type="showPassword ? 'text' : 'password'"
            label="Password"
            placeholder="Enter your password"
            class="login-input"
            :rules="[val => !!val || 'Password is required']"
          >
            <template v-slot:prepend>
              <q-icon name="lock" />
            </template>
            <template v-slot:append>
              <q-icon
                :name="showPassword ? 'visibility' : 'visibility_off'"
                class="cursor-pointer"
                @click="showPassword = !showPassword"
              />
            </template>
          </q-input>

          <!-- Remember Me -->
          <div class="row items-center justify-between q-mb-md">
            <q-checkbox v-model="rememberMe" label="Remember me" />
            <a href="#" class="forgot-password">Forgot password?</a>
          </div>

          <!-- Login Button -->
          <q-btn
            unelevated
            type="submit"
            color="primary"
            label="Sign In"
            class="login-btn"
            :loading="loading"
            no-caps
          />
        </q-form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { authenticateUser } from 'src/data/users'

export default {
  name: 'LoginPage',
  setup() {
    const router = useRouter()
    const username = ref('')
    const password = ref('')
    const showPassword = ref(false)
    const rememberMe = ref(false)
    const loading = ref(false)
    const errorMessage = ref('')

    const handleLogin = async () => {
      loading.value = true
      errorMessage.value = ''

      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500))

      const user = authenticateUser(username.value, password.value)

      if (user) {
        // Store user data in session storage
        sessionStorage.setItem('currentUser', JSON.stringify(user))
        
        // Redirect based on user view
        if (user.view === 'executive') {
          router.push('/')
        } else if (user.view === 'middle-management') {
          router.push('/middle-management/dashboard')
        } else if (user.view === 'unit-personnel') {
          router.push('/unit-personnel/dashboard')
        }
      } else {
        errorMessage.value = 'Invalid username or password. Please try again.'
      }

      loading.value = false
    }

    return {
      username,
      password,
      showPassword,
      rememberMe,
      loading,
      errorMessage,
      handleLogin
    }
  }
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f7fa;
  padding: 20px;
}

.login-container {
  width: 100%;
  max-width: 400px;
}

.login-card {
  background: white;
  border-radius: 16px;
  padding: 36px 32px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.logo-section {
  text-align: center;
  margin-bottom: 32px;
}

.logo-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 6px;
}

.logo-icon {
  width: 32px;
  height: 32px;
  color: #667eea;
}

.logo-text {
  font-size: 26px;
  font-weight: 700;
  color: #1f2937;
  font-family: 'Montserrat', sans-serif;
}

.logo-subtitle {
  font-size: 12px;
  color: #6b7280;
  font-family: 'Montserrat', sans-serif;
}

.login-form {
  width: 100%;
}

.form-title {
  font-size: 20px;
  font-weight: 600;
  color: #1f2937;
  font-family: 'Montserrat', sans-serif;
  margin-bottom: 6px;
}

.form-subtitle {
  font-size: 13px;
  color: #6b7280;
  font-family: 'Montserrat', sans-serif;
  margin-bottom: 20px;
}

.error-message {
  background: #fee2e2;
  color: #dc2626;
  padding: 10px 14px;
  border-radius: 8px;
  font-size: 12px;
  font-family: 'Montserrat', sans-serif;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
}

.login-input {
  margin-bottom: 14px;
  font-family: 'Montserrat', sans-serif;
}

.login-input :deep(.q-field__control) {
  border-radius: 8px;
  font-family: 'Montserrat', sans-serif;
}

.forgot-password {
  color: #667eea;
  font-size: 12px;
  text-decoration: none;
  font-family: 'Montserrat', sans-serif;
}

.forgot-password:hover {
  text-decoration: underline;
}

.login-btn {
  width: 100%;
  height: 42px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  font-family: 'Montserrat', sans-serif;
  margin-top: 6px;
  margin-bottom: 20px;
}

.sample-credentials {
  background: #f3f4f6;
  padding: 16px;
  border-radius: 10px;
  margin-top: 24px;
  border: 1px solid #e5e7eb;
}

.sample-title {
  font-size: 12px;
  font-weight: 600;
  color: #4b5563;
  font-family: 'Montserrat', sans-serif;
  margin-bottom: 8px;
}

.sample-item {
  font-size: 11px;
  color: #6b7280;
  font-family: 'Montserrat', sans-serif;
  padding: 4px 0;
  line-height: 1.5;
}

.sample-item strong {
  color: #374151;
  font-weight: 600;
}

@media (max-width: 600px) {
  .login-card {
    padding: 32px 24px;
  }

  .logo-text {
    font-size: 28px;
  }

  .form-title {
    font-size: 20px;
  }
}
</style>
