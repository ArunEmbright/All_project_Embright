package com.example.auticare;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.view.KeyEvent;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

public class MainActivity extends AppCompatActivity {
WebView web;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        web = findViewById(R.id.webView);
        WebSettings websettings = web.getSettings();
        websettings.setJavaScriptEnabled(true);
        websettings.setDomStorageEnabled((true));
        websettings.setJavaScriptCanOpenWindowsAutomatically(true);
        web.setWebViewClient(new Callback());
        web.loadUrl("https://app-auticare.netlify.app/#/dashboard/home");

    }
private class Callback extends WebViewClient{
    @Override
    public boolean shouldOverrideKeyEvent(WebView view, KeyEvent event) {
        return false;
    }
}
}