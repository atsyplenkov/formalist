if (!file.exists('{{FORMALIST_PATH}}')) {
  # If file does not exist, write
  # an error message to the path
  writeLines('Error_002', con = '{{FORMALIST_PATH}}')
} else {
  tryCatch(
    {
      # Attempt to read the file, process it,
      # and write the updated content
      formalistContent <-
        readLines('{{FORMALIST_PATH}}', encoding = 'UTF-8', warn = FALSE) |>
        paste0(collapse = '\n')
      formalistContent <- pedant::add_double_colons(formalistContent, use_packages = {{USE_PACKAGES_EXPR}}{{IGNORE_FUNCTIONS_EXPR}})
      writeLines(enc2utf8(formalistContent), con = '{{FORMALIST_PATH}}')
      rm(formalistContent)
    },
    error = function(e) {
      # If an error occurs during the formating process,
      # write an error message
      writeLines('Error_001', con = '{{FORMALIST_PATH}}')
    }
  )
}
