<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">


    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Styles -->
    <link href="{{ mix('css/admin.css','build/admin') }}" rel="stylesheet">
    @yield('styles')
</head>
<body>
<div id="app">

</div>

<!-- Scripts -->
<script src="{{ mix('js/manifest.js','build/admin') }}"></script>
<script src="{{ mix('js/vendor.js','build/admin')}}"></script>
<script src="{{ mix('js/bootstrap.js','build/admin')}}"></script>
<script src="{{ mix('js/admin.js','build/admin')}}"></script>

@yield('scripts')
</body>
</html>
