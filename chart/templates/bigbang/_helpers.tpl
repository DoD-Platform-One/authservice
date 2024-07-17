{{/*
Bigbang labels
*/}}
{{- define "bigbang.labels" -}}
app: {{ template "authservice.name" . }}
{{- if .Chart.AppVersion }}
version: {{ .Chart.AppVersion | quote }}
{{- end }}
{{- end }}